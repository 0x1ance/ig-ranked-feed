import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import type { MicroRequest } from "apollo-server-micro/dist/types";
import { context } from "../../server/graphql";
import { schema } from "../../server/graphql/schema";

const apolloServer = new ApolloServer({
  context,
  schema,
  introspection: true,
});

const startServer = apolloServer.start();

export default async function handler(req, res) {

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
export const config = {
  api: {
    bodyParser: false,
  },
};
