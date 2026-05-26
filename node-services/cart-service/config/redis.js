import { createClient } from 'redis';
import cartModel from '../models/cartModel.js';

export const redisSubscriber = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisSubscriber.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
  try {
    await redisSubscriber.connect();
    console.log('Redis Subscriber connected successfully');

    await redisSubscriber.subscribe('order-events', async (message) => {
      try {
        const eventData = JSON.parse(message);
        console.log(`Received event: ${eventData.event} for user: ${eventData.userId}`);

        if (eventData.event === 'OrderPaid') {
          // Clear the cart for the user
          await cartModel.findOneAndUpdate({ userId: eventData.userId }, { cartData: {} });
          console.log(`Cart cleared successfully for user: ${eventData.userId}`);
        }
      } catch (err) {
        console.error('Error processing Redis message:', err);
      }
    });
  } catch (error) {
    console.error('Error connecting Redis Subscriber', error);
  }
};
