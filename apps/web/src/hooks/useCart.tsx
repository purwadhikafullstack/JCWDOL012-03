import { CartProductType } from '@/types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (value: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null,
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(
      'eShopCartItems',
      JSON.stringify([
        {
          id: '65f93523377851060f976112',
          name: 'Apple Watch Pro',
          description: 'Brand new modern watch',
          category: 'Watch',
          brand: 'Apple',
          selectedImg: {
            color: 'White',
            colorCode: '#FFFFFF',
            image:
              'https://firebasestorage.googleapis.com/v0/b/e-shop-project-42c83.appspot.com/o/products%2F1710830876674-apple-watch-tv.jpeg?alt=media&token=45f69e07-6c54-4564-ac13-c510faa75be9',
          },
          quantity: 1,
          price: 950,
        },
      ]),
    );
    const cartItems: any = localStorage.getItem('eShopCartItems');
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent');
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          {
            total: 0,
            qty: 0,
          },
        );

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success('Product added to cart', {
        id: 'success1',
      });

      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCartProducts(filteredProducts);

        toast.success('Product removed', {
          id: 'success2',
        });

        localStorage.setItem(
          'eShopCartItems',
          JSON.stringify(filteredProducts),
        );
      }
    },
    [cartProducts],
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 99) {
        return toast.error('Oops! Max amount reached.');
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
      }

      const existingIndex = cartProducts!.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex > -1) {
        updatedCart![existingIndex].quantity =
          updatedCart![existingIndex].quantity + 1;
      }

      setCartProducts(updatedCart!);
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
    },
    [cartProducts],
  );

  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 1) {
        return toast.error('Oops! Minimum amount reached.');
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
      }

      const existingIndex = cartProducts!.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex > -1) {
        updatedCart![existingIndex].quantity =
          updatedCart![existingIndex].quantity - 1;
      }

      setCartProducts(updatedCart!);
      localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
    },
    [cartProducts],
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    localStorage.setItem('eShopCartItems', JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (value: string | null) => {
      setPaymentIntent(value);
      localStorage.setItem('eShopPaymentIntent', JSON.stringify(value));
    },
    [paymentIntent],
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error('useCart must be used within a CartContextProvider');
  }

  return context;
};
