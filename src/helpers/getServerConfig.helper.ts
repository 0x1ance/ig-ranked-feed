import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig() ?? {};

type Config = {
  REDIS_URL: string;
};

export const getServerConfig = (): Config => serverRuntimeConfig;
