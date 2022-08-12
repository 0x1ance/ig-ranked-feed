import { Post } from "@/generated/graphql";
import { PostFilter } from "../types/dtos/posts.args";
import { elasticsearchClient } from "./elasticsearch";
import { getRedisClient } from "./redis";

export class Datastore {
  async getTotalPostCount() {
    const count = await elasticsearchClient.count({ index: "posts" });
    return count.count;
  }
  async getPosts(skip: number, take: number, filter: PostFilter) {
    let redisClient;
    try {
      redisClient = await getRedisClient();
    } catch (err) {
      console.log("err: ", err);
    }

    if (!redisClient) {
      return this.fetchPostsFromElasticSearch(skip, take, filter);
    }
    // redis layer
    // @ts-ignore
    const res = await redisClient.get("posts" + filter);
    if (res) {
      return JSON.parse(res) as Post[];
    } else {
      return this.fetchPostsFromElasticSearch(skip, take, filter);
    }
  }

  async fetchPostsFromElasticSearch(
    skip: number,
    take: number,
    filter: PostFilter
  ) {
    const redisClient = await getRedisClient();
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
    const posts = res.hits.hits.map((el) => {
      return el._source;
    });

    redisClient && redisClient.setEx("post" + filter, 3600, JSON.stringify(posts));

    return posts as Post[];
  }
}

const datastore = new Datastore();

export default datastore;
