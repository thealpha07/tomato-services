import { createClient } from 'redis';
import cartModel from '../models/cartModel.js';

let redisSubscriber = null;

export const connectRedis = async () => {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    console.warn('REDIS_URL not set — Redis Subscriber disabled');
    return;
  }

  try {
    redisSubscriber = createClient({ url: redisUrl });

    redisSubscriber.on('error', (err) => console.error('Redis Subscriber Error:', err.message));
    redisSubscriber.on('connect', () => console.log('Redis Subscriber connected'));
    redisSubscriber.on('reconnecting', () => console.log('Redis Subscriber reconnecting...'));

    await redisSubscriber.connect();

    // Listen for order events from order-service
    await redisSubscriber.subscribe('order-events', async (message) => {
      try {
        const eventData = JSON.parse(message);
        console.log(`Received event: ${eventData.event} for user: ${eventData.userId}`);

        if (eventData.event === 'OrderPaid') {
          await cartModel.findOneAndUpdate(
            { userId: eventData.userId },
            { cartData: {} }
          );
          console.log(`Cart cleared for user: ${eventData.userId}`);
        }
      } catch (err) {
        console.error('Error processing Redis message:', err);
      }
    });

    console.log('Redis Subscriber listening on "order-events" channel');
  } catch (error) {
    console.error('Failed to connect Redis Subscriber:', error.message);
  }
};
