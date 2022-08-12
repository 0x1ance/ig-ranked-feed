import { Datastore } from "@/server/graphql/services/datastore";
import { ContextFunction } from "apollo-server-core";

import type { MicroRequest } from "apollo-server-micro/dist/types";
import type { ServerResponse } from "http";
import datastore from "../services/datastore";

const contextData = {};

export type GraphqlContextType = typeof contextData & {
  req: MicroRequest;
  res: ServerResponse;
  datastore: Datastore;
};

export const context: ContextFunction<
  { req: MicroRequest; res: ServerResponse },
  GraphqlContextType
> = async ({ req, res }) => {
  const authToken = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : undefined;

  const context = {
    req,
    res,
    datastore,
    ...contextData,
  };

  return { ...context };
};
