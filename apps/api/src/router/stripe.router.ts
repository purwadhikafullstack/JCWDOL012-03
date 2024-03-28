import { getAllProfileUser } from '@/controllers/user.controller';
import authenticationMiddleware from '@/middleware/auth.middleware';
import prisma from '@/prisma';
import { Router } from 'express';
import Stripe from 'stripe';

const stripeRouter: Router = Router();

const calculateOrderAmount = (items: any) => {
  const totalPrice = items.reduce((acc: any, item: any) => {
    const itemTotal = item.price * item.quantity;

    return acc + itemTotal;
  }, 0);

  //   const price: any = totalPrice.toFixed(2)
  const price: any = Math.floor(totalPrice);

  return price;
};

stripeRouter.post('/create-payment-intent', async (req, res, next) => {
  try {
    console.log('ASP');

    const currentUser = await prisma.user.findUnique({
      where: {
        id: 1,
      },
    });
    if (!currentUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-10-16', // default 2023-10-16
    });
    const { items, payment_intent_id } = req.body;
    const total = calculateOrderAmount(items) * 100;
    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: 'usd',
      status: 'pending',
      deliveryStatus: 'pending',
      paymentIntentId: payment_intent_id,
      products: items,
    };

    if (payment_intent_id) {
      const current_intent =
        await stripe.paymentIntents.retrieve(payment_intent_id);

      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          { amount: total },
        );
        // update the order

        const [existing_order, update_order] = await Promise.all([
          prisma.order.findFirst({
            where: { paymentIntentId: payment_intent_id },
          }),
          prisma.order.update({
            where: { paymentIntentId: payment_intent_id },
            data: {
              amount: total,
              products: items,
            },
          }),
        ]);

        if (!existing_order) {
          res.status(400).json({ error: 'Invalid Payment Intent' });
        }

        res.status(200).json({ paymentIntent: updated_intent });
      }
    } else {
      // create the payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
      });

      // create the order
      orderData.paymentIntentId = paymentIntent.id;

      await prisma.order.create({
        data: orderData,
      });

      res.status(200).json({ paymentIntent });
    }
  } catch (error) {
    next(error);
  }
});

export default stripeRouter;
