"use client"; // Client component

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import PostCard from "@components/cards/PostCard";
import { useState, useEffect } from "react";

const PostList = ({ feedPost }) => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(!isLoaded);

  useEffect(() => {
    setLoading(!isLoaded);
  }, [isLoaded]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {feedPost.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          creator={post.creator}
          loggedInUser={user}
          update={() => {}}
        />
      ))}
    </>
  );
};

export default PostList;
