
import { ApolloServer } from "apollo-server-micro";
import nextConnect from "next-connect";
import "reflect-metadata";

import { schema } from "@/server/graphql/schema";
import { context } from "@/server/graphql";

import type { MicroRequest } from "apollo-server-micro/dist/types";

const connector = nextConnect();

const apolloServer = new ApolloServer({
  context,
  schema,
  introspection: true,
});

const startServer = apolloServer.start();

const handler = connector.use(async (req: MicroRequest, res: any) => {
  await startServer;

  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
};
