import "reflect-metadata";
import DataStore from "../../../scraped/processed.json";

import { graphql } from "graphql";

import { Maybe } from "graphql/jsutils/Maybe";

import { createSchema } from "@/server/graphql/schema";
import { GraphqlContextType } from "@/server/graphql/context";
import { Post } from "@/generated/graphql";

type GraphqlCallOptionType = {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
  context?: GraphqlContextType & Maybe<{ [key: string]: any }>;
};

/**
 * This function setup a new mock graphql server with same schema as the development server
 * and execute a mock call with "source" to a desired endpoint
 * @param {GraphqlCallOptionType} config
 * @returns {ExecutionResult} the result of querying a endpoint with a new mock graphql server
 */
export const gCall = async ({
  source,
  variableValues,
  context,
}: GraphqlCallOptionType) => {
  context = {
    req: {} as unknown as any,
    res: {} as unknown as any,
    datastore: {
      getTotalPostCount: async () => {
        return DataStore.length;
      },
      getPosts: async (skip, take, filter) => {
        return DataStore.slice(skip, skip + take) as unknown as Post[];
      },
    },
  };
  return graphql({
    schema: await createSchema(),
    source,
    contextValue: context,
    variableValues,
  });
};
