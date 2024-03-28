import CartClient from './CartClient';
import Container from '@/components/Container';

const Cart = async () => {
  // const currentUser = await getCurrentUser()
  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={null} />
      </Container>
    </div>
  );
};

export default Cart;
