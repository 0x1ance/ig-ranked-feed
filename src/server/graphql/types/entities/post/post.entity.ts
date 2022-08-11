import { Directive, Field, Float, ID, Int, ObjectType } from "type-graphql";
import { Node } from "@/server/graphql/generics";
import { DateTimeResolver } from "graphql-scalars";

@ObjectType({ implements: [Node] })
export class Post extends Node {
  id: string;

  @Field(() => String)
  type: "image" | "video";

  @Field((_type) => Int)
  likeCount: number;

  @Field((_type) => Int)
  commentCount: number;

  @Field((_type) => Boolean)
  isVideo: boolean;

  @Field()
  owner: string;

  @Field()
  shortcode: string;

  @Field((_type=> DateTimeResolver))
  createdAt: Date;

  @Field()
  url: string;

  @Field()
  thumbnailUrl: string;

  @Field((_type) => Int, { nullable: true })
  videoViewCount?: number;
}
