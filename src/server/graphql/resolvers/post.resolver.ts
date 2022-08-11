import { getOffsetWithDefault, offsetToCursor } from "graphql-relay";

import { Resolver, Query, Ctx, Args, Authorized } from "type-graphql";
import { Service } from "typedi";
import type { GraphqlContextType } from "../context";
import { getApolloError } from "../error";
import DataStore from "../services/datastore";
import { Post } from "../types";
import { PostConnection } from "../types/dtos/post.connection";
import { PostConnectionArguments } from "../types/dtos/posts.args";
import { Node } from "@/server/graphql/generics";

@Service()
@Resolver(() => Post)
export class PostResolver {

  // TODO: test cases
  @Query(() => PostConnection)
  async posts(
    @Ctx() ctx: GraphqlContextType,
    @Args(() => PostConnectionArguments)
    args: PostConnectionArguments
  ) {
    const { first, last, before, after, filter } = args;
    // const first = 2;
    // let last, before, after;

    if ((!first && !last) || (first && last)) {
      throw getApolloError("INPUT", "Invalid Input");
    }

    // totalCount
    const totalCount = DataStore.length;

    // offsets
    const beforeOffset = getOffsetWithDefault(before, totalCount);
    const afterOffset = getOffsetWithDefault(after, -1);

    let startOffset = Math.max(-1, afterOffset) + 1;
    let endOffset = Math.min(beforeOffset, totalCount);

    if (first) {
      endOffset = Math.min(endOffset, startOffset + first);
    }

    if (last) {
      startOffset = Math.max(startOffset, endOffset - last);
    }

    // skip, take
    const skip = Math.max(startOffset, 0); // sql offset
    const take = Math.max(endOffset - startOffset, 1); // sql limit

    // get records
    const records = DataStore.slice(skip, skip + take);

    // generate edges
    const edges = records.map((record, index) => ({
      cursor: offsetToCursor(startOffset + index),
      node: record as unknown as Node,
    }));

    // page info
    const { length, 0: firstEdge, [length - 1]: lastEdge } = edges;
    // let length = edges.length;
    // let firstEdge = edges[0];
    // let lastEdge = edges[length - 1];
    const lowerBound = after ? afterOffset + 1 : 0;
    const upperBound = before ? Math.min(beforeOffset, totalCount) : totalCount;
    const pageInfo = {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage: last ? startOffset > lowerBound : false,
      hasNextPage: first ? endOffset < upperBound : false,
    };

    return {
      edges,
      pageInfo,
      totalCount,
    };
  }
}
