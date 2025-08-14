import Stripe from 'stripe';
import config from '../app/config';


export const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2025-07-30.basil',
});
