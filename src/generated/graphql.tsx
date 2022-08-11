import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** An object with a global ID. */
export type Node = {
  /** The global ID of the object. */
  id: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** When paginating backwards, are there more items? */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = Node & {
  __typename?: 'Post';
  commentCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  /** The global ID of the object. */
  id: Scalars['ID'];
  isVideo: Scalars['Boolean'];
  likeCount: Scalars['Int'];
  owner: Scalars['String'];
  shortcode: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
  videoViewCount?: Maybe<Scalars['Int']>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Float'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Post;
};

/** The filter for post */
export enum PostFilter {
  Popularity = 'POPULARITY',
  Recency = 'RECENCY'
}

export type Query = {
  __typename?: 'Query';
  /** Fetches an object given its global ID. */
  node?: Maybe<Node>;
  /** Fetches objects given their global IDs. */
  nodes: Array<Maybe<Node>>;
  posts: PostConnection;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filter: PostFilter;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PostFragment = { __typename?: 'Post', id: string, type: string, likeCount: number, commentCount: number, isVideo: boolean, owner: string, shortcode: string, createdAt: any, url: string, thumbnailUrl: string, videoViewCount?: number | null };

export type PopularPostsQueryVariables = Exact<{
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}>;


export type PopularPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', totalCount: number, edges?: Array<{ __typename?: 'PostEdge', cursor: string, node: { __typename?: 'Post', id: string, type: string, likeCount: number, commentCount: number, isVideo: boolean, owner: string, shortcode: string, createdAt: any, url: string, thumbnailUrl: string, videoViewCount?: number | null } } | null> | null, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage?: boolean | null, hasNextPage?: boolean | null } } };

export type RecentPostsQueryVariables = Exact<{
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
}>;


export type RecentPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', totalCount: number, edges?: Array<{ __typename?: 'PostEdge', cursor: string, node: { __typename?: 'Post', id: string, type: string, likeCount: number, commentCount: number, isVideo: boolean, owner: string, shortcode: string, createdAt: any, url: string, thumbnailUrl: string, videoViewCount?: number | null } } | null> | null, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage?: boolean | null, hasNextPage?: boolean | null } } };

export const PostFragmentDoc = gql`
    fragment Post on Post {
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
    `;
export const PopularPostsDocument = gql`
    query PopularPosts($before: String, $after: String, $first: Int, $last: Int) {
  posts(
    before: $before
    after: $after
    first: $first
    last: $last
    filter: POPULARITY
  ) {
    edges {
      node {
        ... on Post {
          ...Post
        }
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
    ${PostFragmentDoc}`;

/**
 * __usePopularPostsQuery__
 *
 * To run a query within a React component, call `usePopularPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePopularPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePopularPostsQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function usePopularPostsQuery(baseOptions?: Apollo.QueryHookOptions<PopularPostsQuery, PopularPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PopularPostsQuery, PopularPostsQueryVariables>(PopularPostsDocument, options);
      }
export function usePopularPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PopularPostsQuery, PopularPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PopularPostsQuery, PopularPostsQueryVariables>(PopularPostsDocument, options);
        }
export type PopularPostsQueryHookResult = ReturnType<typeof usePopularPostsQuery>;
export type PopularPostsLazyQueryHookResult = ReturnType<typeof usePopularPostsLazyQuery>;
export type PopularPostsQueryResult = Apollo.QueryResult<PopularPostsQuery, PopularPostsQueryVariables>;
export const RecentPostsDocument = gql`
    query RecentPosts($before: String, $after: String, $first: Int, $last: Int) {
  posts(
    before: $before
    after: $after
    first: $first
    last: $last
    filter: RECENCY
  ) {
    edges {
      node {
        ... on Post {
          ...Post
        }
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
    ${PostFragmentDoc}`;

/**
 * __useRecentPostsQuery__
 *
 * To run a query within a React component, call `useRecentPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentPostsQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useRecentPostsQuery(baseOptions?: Apollo.QueryHookOptions<RecentPostsQuery, RecentPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentPostsQuery, RecentPostsQueryVariables>(RecentPostsDocument, options);
      }
export function useRecentPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentPostsQuery, RecentPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentPostsQuery, RecentPostsQueryVariables>(RecentPostsDocument, options);
        }
export type RecentPostsQueryHookResult = ReturnType<typeof useRecentPostsQuery>;
export type RecentPostsLazyQueryHookResult = ReturnType<typeof useRecentPostsLazyQuery>;
export type RecentPostsQueryResult = Apollo.QueryResult<RecentPostsQuery, RecentPostsQueryVariables>;