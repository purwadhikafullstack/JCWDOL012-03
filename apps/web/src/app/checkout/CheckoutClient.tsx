'use client';

import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Button from '@/components/Button';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    'stripe' | 'wire_transfer'
  >('stripe'); // ChatGPT recommendation

  const router = useRouter();

  console.log('paymentIntent', paymentIntent);
  console.log('clientSecret', clientSecret);

  useEffect(() => {
    localStorage.setItem(
      'eShopPaymentIntent',
      JSON.stringify('pi_3OzAvFKO889jKIi70BHA2MdP'),
    );
  }, []);

  useEffect(() => {
    // create a paymentIntent as soon as the page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch('localhost:9296/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          console.log(res);

          setLoading(false);
          if (res.status === 401) {
            return router.push('/auth/signin');
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.error('Error fetching payment intent:', error); // changed based on ChatGPT recommendation
          toast.error('Something went wrong');
        });
    }
  }, [cartProducts, handleSetPaymentIntent, paymentIntent, router]); // changed based on ChatGPT recommendation

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedPaymentMethod = event.target.value as
      | 'stripe'
      | 'wire_transfer';
    setPaymentMethod(selectedPaymentMethod);
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      <div>
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <option value="stripe">Stripe</option>
          <option value="wire_transfer">Wire Transfer</option>
        </select>
      </div>

      {paymentMethod === 'stripe' && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            handleStripePayment={() => {}} // Probably can be deleted
          />
        </Elements>
      )}

      {paymentMethod === 'wire_transfer' && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            wireTransfer={true}
          />
        </Elements>
      )}

      {loading && <div className="text-center">Loading Checkout...</div>}
      {error && (
        <div className="text-center text-rose-500">Something went wrong...</div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Successful</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => router.push('/orders')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
