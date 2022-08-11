import { useRecentPostsQuery } from "@/generated/graphql";
import React, { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import clsx from "clsx";
import { PostCard } from "./PostCard.component";

export const RecentPostFeed = () => {
  const { data, loading, error, fetchMore } = useRecentPostsQuery({
    variables: {
      first: 20,
    },
  });
  
  if (loading) return <div>loading</div>;

  return (
    <>
      <InfiniteScroll
        className="card min-h-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6"
        dataLength={data.posts.edges.length} //This is important field to render the next data
        next={() => {
          fetchMore({
            variables: {
              first: 20,
              after: data.posts.pageInfo.endCursor,
            },
          });
        }}
        hasMore={data.posts.pageInfo.hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <div
            className={clsx(
              "flex items-end font-normal text-sm col-span-1 md:col-span-2 lg:col-span-3 2xl:grid-cols-4",
              "justify-center"
            )}
          >
            no more post
          </div>
        }
      >
        {data.posts.edges.map((edge, idx) => (
          <PostCard key={idx} post={edge.node}></PostCard>
        ))}
      </InfiniteScroll>
    </>
  );
};
