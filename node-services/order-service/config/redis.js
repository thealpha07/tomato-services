import { createClient } from 'redis';

let redisPublisher = null;
let isConnected = false;

export const connectRedis = async () => {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    console.warn('REDIS_URL not set — Redis Publisher disabled');
    return;
  }

  try {
    redisPublisher = createClient({ url: redisUrl });

    redisPublisher.on('error', (err) => console.error('Redis Publisher Error:', err.message));
    redisPublisher.on('connect', () => console.log('Redis Publisher connected'));
    redisPublisher.on('reconnecting', () => console.log('Redis Publisher reconnecting...'));

    await redisPublisher.connect();
    isConnected = true;
  } catch (error) {
    console.error('Failed to connect Redis Publisher:', error.message);
    isConnected = false;
  }
};

export const publishEvent = async (channel, data) => {
  if (!redisPublisher || !isConnected) {
    console.warn('Redis not available — skipping publish');
    return false;
  }
  try {
    await redisPublisher.publish(channel, JSON.stringify(data));
    console.log(`Published to ${channel}:`, data.event);
    return true;
  } catch (error) {
    console.error('Failed to publish event:', error.message);
    return false;
  }
};
