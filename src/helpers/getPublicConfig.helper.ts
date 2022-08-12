import getConfig from "next/config";

export type PublicRuntimeConfigType = {};

const { publicRuntimeConfig } = getConfig() ?? {};

export const getPublicConfig = (): PublicRuntimeConfigType =>
  publicRuntimeConfig;
