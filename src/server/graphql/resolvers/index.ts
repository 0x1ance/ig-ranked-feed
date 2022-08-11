import { NonEmptyArray } from "type-graphql";
import { NodeResolver } from "./node.resolver";

import { PostResolver } from "./post.resolver";

const resolvers = [
  NodeResolver,
  PostResolver,
];

export default resolvers as unknown as
  | NonEmptyArray<Function>
  | NonEmptyArray<string>;
