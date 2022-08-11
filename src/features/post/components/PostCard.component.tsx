import { PostFragment } from "@/generated/graphql";
import React, { FC, useEffect, useRef, useState } from "react";
import ThumbUpIcon from "@heroicons/react/outline/ThumbUpIcon";
import AnnotationIcon from "@heroicons/react/outline/AnnotationIcon";
import {
  PostCardContextProvider,
  usePostCardContext,
} from "../context/PostCard.context";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export const PostCard: FC<{ post: PostFragment }> = ({ post }) => {
  return (
    <PostCardContextProvider post={post}>
      <Link href={`https://www.instagram.com/p/${post.shortcode}`}>
        <a target="_blank" rel="noopener noreferrer">
          <div className="rounded bg-white p-3 min-w-[300px] text-black min-h-[300px] hover:cursor-pointer">
            {post.isVideo ? <PostVideoDisplay /> : <PostImageDisplay />}
            <div className="flex flex-1 justify-between py-2">
              <div className="flex items-center space-x-2">
                <ThumbUpIcon className="w-6 h-6" />
                <div className="font-semibold">{post.likeCount}</div>
              </div>
              <div className="flex items-center space-x-2">
                <AnnotationIcon className="w-6 h-6" />
                <div className="font-semibold">{post.commentCount}</div>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </PostCardContextProvider>
  );
};

const PostVideoDisplay: FC = () => {
  const videoRef = useRef(null);
  const { post, isVisible } = usePostCardContext();

  useEffect(() => {
    if (isVisible) {
      videoRef.current.play();
    } else {
      if (videoRef.current.play) {
        videoRef.current.pause();
      }
    }
  }, [isVisible]);

  return (
    <div className="w-full bg-red-100 aspect-square rounded flex flex-col items-center justify-center overflow-hidden">
      {/* {post.type} {isVisible && "hi"} */}
      <video
        width="100%"
        height="100%"
        loop
        ref={videoRef}
        crossOrigin="anonymous"
      >
        <source src={post.url} type="video/mp4" />
      </video>
      <div
        className={clsx(
          "font-bold",
          isVisible ? "text-blue-400" : "text-red-400"
        )}
      >
        {isVisible ? "video playing" : "video paused"}
      </div>
      <div className="hover:underline">{post.url}</div>
    </div>
  );
};
const PostImageDisplay: FC = () => {
  const { post } = usePostCardContext();
  console.log("image post code: ", post);
  return (
    <div className="w-full aspect-square rounded relative">
      <Image src={post.url} layout="fill" alt="" objectFit="cover" />
    </div>
  );
};
