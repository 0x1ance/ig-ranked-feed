import { Directive, Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Node } from "@/server/graphql/generics";
import { DateTimeResolver } from "graphql-scalars";

@ObjectType({ implements: [Node] })
export class Post extends Node {
  id: string;

  @Field(() => String, { simple: true })
  type: "image" | "video";

  @Field((_type) => Int, { simple: true })
  likeCount: number;

  @Field((_type) => Int, { simple: true })
  commentCount: number;

  @Field((_type) => Boolean, { simple: true })
  isVideo: boolean;

  @Field({ simple: true })
  owner: string;

  @Field({ simple: true })
  shortcode: string;

  @Field((_type) => DateTimeResolver, { simple: true })
  createdAt: Date;

  @Field({ simple: true })
  url: string;

  @Field({ simple: true })
  thumbnailUrl: string;

  @Field((_type) => Int, { nullable: true, simple: true })
  videoViewCount?: number;
}
