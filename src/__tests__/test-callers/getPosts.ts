import { PostConnectionArguments } from "./../../server/graphql/types/dtos/posts.args";
import { testCallerFactory } from "@test/test-callers/testCallerFactory";
import { PostConnection } from "@/server/graphql/types/dtos/post.connection";

const defaultSource = `
query Posts($before: String, $after: String, $first: Int, $last: Int) {
  posts(before: $before, after: $after, first: $first, last: $last, filter: POPULARITY) {
    edges {
      node {
        id
        type
        likeCount
        commentCount
        isVideo
        owner
        shortcode
        createdAt
        url
        thumbnailUrl
        videoViewCount
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    totalCount
  }
}
`;

export const getPosts = testCallerFactory<
  PostConnectionArguments,
  PostConnection
>(defaultSource);
