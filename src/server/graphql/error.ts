import { ApolloError } from 'apollo-server-core';

type ErrorCode = 'USER' | 'INPUT' | 'INTERNAL' | 'BUSINESS';

export class CustomApolloError<T extends string> extends ApolloError {
  constructor(code: ErrorCode, message: T, extensions?: Record<string, any>) {
    super(message, code, extensions);
  }
}

export const getApolloError = (errorCode: ErrorCode, msg: string, params?: Record<string, any>) =>
  new CustomApolloError<string>(errorCode, msg, params);
