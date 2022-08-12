import { ConnectionArguments } from "@/server/graphql/generics";
import { ArgsType, Field, ID } from "type-graphql";
import { registerEnumType } from "type-graphql";

export enum PostFilter {
  POPULARITY,
  RECENCY,
}

registerEnumType(PostFilter, {
  name: "PostFilter", // this one is mandatory
  description: "The filter for post", // this one is optional
});

@ArgsType()
export class PostConnectionArguments extends ConnectionArguments {
  @Field(() => PostFilter)
  filter: PostFilter;
}
