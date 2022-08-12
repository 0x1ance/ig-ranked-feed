import { getServerConfig } from "@/helpers/getServerConfig.helper";
import * as Redis from "redis";
const { REDIS_URL } = getServerConfig();

let redisClient;

export const getRedisClient = async () => {
  if (!REDIS_URL) return null;

  if (!redisClient) {
    redisClient = await Redis.createClient({
      url: REDIS_URL,
    });
  }

  try {
    await redisClient.connect();
  } catch (err) {}

  return redisClient;
};
