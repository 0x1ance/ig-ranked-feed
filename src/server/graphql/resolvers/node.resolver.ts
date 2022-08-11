import { GraphqlContextType } from "@/server/graphql/context";
import { fromGlobalId, toGlobalId } from "graphql-relay";
import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Info,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Node } from "@/server/graphql/generics";
import { getApolloError } from "@/server/graphql/error";
import { Service } from "typedi";
import { Post } from "../types";
import DataStore from "../services/datastore";

@Resolver(() => Node)
@Service()
export class NodeResolver {
  @FieldResolver()
  globalId(
    @Root() { id }: { id: string },
    @Info() { parentType: { name } }: { parentType: { name: string } }
  ): string {
    return toGlobalId(name, id);
  }

  private async fetcher(
    globalId: string,
    { req }: GraphqlContextType
  ): Promise<Node | undefined> {
    const { type, id } = fromGlobalId(globalId);
    if (type !== 'Post') {
      throw getApolloError(
        'INPUT',
        'invalid type'
      );
    }

    const record = DataStore[id]
    if (!record) {
      throw getApolloError(
        "USER",
        'node cant be resolved'
      );
    }
    return { ...record, _type: Post };
  }

  @Query(() => Node, {
    nullable: true,
    description: "Fetches an object given its global ID.",
  })
  node(
    @Arg("id", () => ID, { description: "The global ID of the object." })
    globalId: string,
    @Ctx() context: GraphqlContextType
  ): ReturnType<NodeResolver["fetcher"]> {
    return this.fetcher(globalId, context);
  }

  @Query(() => [Node], {
    nullable: "items",
    description: "Fetches objects given their global IDs.",
  })
  nodes(
    @Arg("ids", () => [ID], { description: "The global IDs of the objects." })
    globalIds: Array<string>,
    @Ctx() context: GraphqlContextType
  ): Array<ReturnType<NodeResolver["fetcher"]>> {
    return globalIds.map((id) => this.fetcher(id, context));
  }
}
