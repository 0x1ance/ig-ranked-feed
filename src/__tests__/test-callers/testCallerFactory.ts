import { ExecutionResult } from "graphql";

import { ClassType } from "type-graphql";

import { gCall } from "../test-utils/gCall";

export type MockCallProps<InputType> = {
  source?: string;
  input?: InputType;
};

/**
 * This generate a test caller for a specific endpoint
 * by passing inputType and payloadType, it utilise the power of typegraphql during testing
 * @param {string} defaultSource: the default source of the graphql call
 * @param {Func} inputTransformFunction: (optional) defines how the input being mapped into graphql variableValues
 * e.g. graphql endpoint accept data: { id:string }, while our input: {id:string}
 * e.g. then we define a inputTransformFunction (input) => ({data: input})
 * @returns {(config) => Promise<ExecutionResult>} return a configurable graphql caller function
 * when using the returned configurable caller function
 * we can configure the mock context with high flexibility whenever we needed
 */
export const testCallerFactory =
  <InputType, PayloadType>(
    defaultSource: string,
    inputTransfromFunction?: (input: InputType) => any
  ): ((config) => Promise<ExecutionResult>) =>
  async ({ source, input }: MockCallProps<InputType> = {}) => {
    return gCall({
      source: source ?? defaultSource,
      variableValues:
        input && inputTransfromFunction ? inputTransfromFunction(input) : input,
    }) as Promise<
      ExecutionResult<
        {
          [key: string]: PayloadType & { [key: string]: any } & any;
        },
        {
          [key: string]: any;
        }
      >
    >;
  };
