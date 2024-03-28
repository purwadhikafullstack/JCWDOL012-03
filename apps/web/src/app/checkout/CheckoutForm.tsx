'use client';

import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/formatPrice';
import {
  PaymentElement,
  useElements,
  useStripe,
  AddressElement,
  Elements,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Button from '@/components/Button';
import Heading from '@/components/Heading';

interface CheckoutFormProps {
  clientSecret?: string;
  handleSetPaymentSuccess: (value: boolean) => void;
  wireTransfer?: boolean;
  handleStripePayment?: (e: React.FormEvent) => void; // Define the prop for handling Stripe payments
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
  handleStripePayment,
  wireTransfer,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null); // State to store bank transfer proof file
  const formattedPrice = formatPrice(cartTotalAmount);
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // ChatGPT recommendation
  const [bankTransferConfirmation, setBankTransferConfirmation] = useState('');

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]); // ChatGPT recommendation

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedPaymentMethod = event.target.value as
      | 'stripe'
      | 'bankTransfer';
    setPaymentMethod(selectedPaymentMethod);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'stripe') {
      // Handle Stripe payment
      if (!stripe || !elements) {
        return;
      }

      try {
        setIsLoading(true);
        const result = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
        });

        if (!result.error) {
          toast.success('Checkout Successful');
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        } else {
          toast.error('Payment failed');
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    } else if (paymentMethod === 'bankTransfer') {
      if (!proofFile) {
        toast.error('Please upload bank transfer proof');
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append('proofFile', proofFile);

      try {
        const response = await axios.post(
          '/api/submit-bank-transfer-confirmation',
          formData,
        );
        console.log(
          'Bank transfer confirmation submitted successfully:',
          response.data,
        );
        toast.success('Bank transfer confirmation submitted successfully');
        setBankTransferConfirmation(response.data);
        setProofFile(null);
      } catch (error) {
        console.error('Error submitting bank transfer confirmation:', error);
        toast.error('Failed to submit bank transfer confirmation');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Select Payment Method:
        </label>
        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value as 'stripe' | 'bankTransfer')
          }
          className="px-3 py-2 border rounded-md"
        >
          <option value="stripe">Stripe Payment</option>
          <option value="bankTransfer">Bank Transfer</option>
        </select>
      </div>
      {paymentMethod === 'bankTransfer' && (
        <div>
          <h2 className="font-semibold mb-2">Bank Transfer Instructions:</h2>
          <p>
            Here are the instructions for making a bank transfer: Please
            transfer to this following bank account: 123123123123
          </p>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">
              Upload Payment Proof:
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              className="px-3 py-2 border rounded-md"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Bank Transfer Confirmation:
              </label>
              <textarea
                value={bankTransferConfirmation}
                onChange={(e) => setBankTransferConfirmation(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter bank transfer confirmation details"
                required
              />
            </div>
            <Button
              type="submit"
              label="Submit Bank Transfer Confirmation"
              disabled={!bankTransferConfirmation}
            />
          </form>
        </div>
      )}
      <h2 className="font-semibold smb-2">Address Information</h2>
      <AddressElement
        options={{
          mode: 'shipping',
          allowedCountries: ['US', 'ID'],
        }}
      />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
        label={isLoading ? 'Processing' : 'Pay now'}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
