import { useCallback, useEffect, useState } from "react";
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postlist: [],
  addPost: () => {},
  deletePost: () => {},
  Fetching: () => {},
  setFetching: () => {},
});

const postlistReducer = (currpostlist, action) => {
  let newpostlist = currpostlist;
  if (action.type === "DELETE_POST") {
    newpostlist = currpostlist.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "CREATE_POST") {
    newpostlist = [action.payload, ...currpostlist];
  } else if (action.type === "CREATE_INITIAL_POSTS") {
    newpostlist = action.payload.posts;
  }

  return newpostlist;
};

const PostListProvider = ({ children }) => {
  const [postlist, dispatchPostList] = useReducer(postlistReducer, []);
  const addPost = (post) => {
    dispatchPostList({
      type: "CREATE_POST",
      payload: post,
    });
  };
  const [Fetching, setFetching] = useState(false);
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "CREATE_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };
  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        console.log("here i a useig callback");
        setFetching(false);
      });

    return () => {
      console.log("cleaig up useEffect ");
      controller.abort();
    };
  }, []);
  return (
    <PostList.Provider
      value={{
        postlist: postlist,
        addPost: addPost,
        deletePost: deletePost,
        Fetching: Fetching,
        setFetching: setFetching,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
