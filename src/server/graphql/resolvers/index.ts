import { NonEmptyArray } from "type-graphql";

import { PostResolver } from "./post.resolver";

const resolvers = [
  PostResolver,
];

export default resolvers as unknown as
  | NonEmptyArray<Function>
  | NonEmptyArray<string>;
