import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import Welcomemsg from "./Welcomemsg";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postlist, Fetching } = useContext(PostListData);

  return (
    <>
      {Fetching && <LoadingSpinner />}

      {!Fetching && postlist.length === 0 && <Welcomemsg />}
      {postlist.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};
export default PostList;
