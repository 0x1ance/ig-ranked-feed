import { getServerConfig } from "@/helpers/getServerConfig.helper";
import * as Redis from "redis";
const config = getServerConfig();

let redisClient;

export const getRedisClient = async () => {
  if (!config.REDIS_URL) return null;

  if (!redisClient) {
    redisClient = await Redis.createClient({
      url: config.REDIS_URL,
    });
  }

  try {
    await redisClient.connect();
  } catch (err) {}

  return redisClient;
};
