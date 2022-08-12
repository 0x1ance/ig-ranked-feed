import { Post } from "@/generated/graphql";
import { PostFilter } from "../types/dtos/posts.args";
import { elasticsearchClient } from "./elasticsearch";

export class Datastore {
  async getTotalPostCount() {
    const count = await elasticsearchClient.count({ index: "posts" });
    return count.count;
  }
  async getPosts(skip: number, take: number, filter: PostFilter) {
    const sort =
      filter === PostFilter.POPULARITY
        ? [
            {
              likeCount: { order: "desc" },
            },
          ]
        : [
            {
              createdAt: {
                order: "desc",
                format: "strict_date_optional_time_nanos",
              },
            },
          ];

    const res = await elasticsearchClient.search({
      index: "posts",
      query: { match_all: {} },
      //@ts-ignore
      sort,
      from: skip,
      size: take,
    });

    return res.hits.hits.map((el) => {
      return el._source;
    }) as Post[];
  }
}

const datastore = new Datastore();

export default datastore;
