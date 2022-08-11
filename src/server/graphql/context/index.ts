import { ContextFunction } from "apollo-server-core";

import type { MicroRequest } from "apollo-server-micro/dist/types";
import type { ServerResponse } from "http";

const contextData = {};

export type GraphqlContextType = typeof contextData & {
  req: MicroRequest;
  res: ServerResponse;
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
    ...contextData,
  };

  return { ...context  };
};
