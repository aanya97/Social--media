import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postbodyElement = useRef();
  const reactionsElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = () => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postbody = postbodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postbodyElement.current.value = "";
    reactionsElement.current.value = "";
    tagsElement.current.value = "";
    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postbody,
        reactions: { likes: reactions },
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
      });
  };

  return (
    <form className="createPost" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label ">
          Enter Your User ID here.
        </label>
        <input
          type="Text"
          className="form-control"
          id="title"
          ref={userIdElement}
          placeholder="Your user id"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label ">
          Post Title
        </label>
        <input
          type="Text"
          className="form-control"
          id="title"
          ref={postTitleElement}
          placeholder="how are you feeling Today..."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label ">
          Post Content
        </label>
        <textarea
          type="Text"
          rows="4"
          className="form-control"
          id="body"
          ref={postbodyElement}
          placeholder="Tell us more about it..."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="reactions" className="form-label ">
          Number of reaction
        </label>
        <input
          type="Text"
          className="form-control"
          id="title"
          ref={reactionsElement}
          placeholder="How many peoples reacted to this post"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label ">
          Enter Your hashtags
        </label>
        <input
          type="Text"
          className="form-control"
          id="title"
          ref={tagsElement}
          placeholder="Please enter tags using space"
        />
      </div>

      <button type="submit" className="btn btn-primary ">
        Post
      </button>
    </form>
  );
};
export default CreatePost;
