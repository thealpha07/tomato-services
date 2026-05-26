import { createClient } from 'redis';

export const redisPublisher = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisPublisher.on('error', (err) => console.log('Redis Client Error', err));

export const connectRedis = async () => {
  try {
    await redisPublisher.connect();
    console.log('Redis Publisher connected successfully');
  } catch (error) {
    console.error('Error connecting Redis Publisher', error);
  }
};
