import path from "path";

import { buildSchema, buildSchemaSync } from "type-graphql";
import { Container } from "typedi";

import resolvers from "./resolvers";

export const schema = buildSchemaSync({
  resolvers: [...resolvers],
  container: Container,
  emitSchemaFile: path.resolve('./src/generated/graphql/schema.graphql'),
  dateScalarMode: 'timestamp',
});

export const createSchema = () =>
  buildSchema({
    resolvers: [...resolvers],
  });
