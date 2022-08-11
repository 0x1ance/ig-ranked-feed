import 'reflect-metadata'

import { graphql } from 'graphql'

import { Maybe } from 'graphql/jsutils/Maybe'


import { createSchema } from '@/server/graphql/schema'

type GraphqlCallOptionType = {
  source: string
  variableValues?: Maybe<{ [key: string]: any }>
  context?: Maybe<{ [key: string]: any }>
}

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
  return graphql({
    schema: await createSchema(),
    source,
    variableValues,
  })
}
