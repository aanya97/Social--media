import { useContext } from "react";

import { MdDelete } from "react-icons/md";
import { PostList } from "../store/post-list-store";
const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card  postcard" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}{" "}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <MdDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((hash) => (
          <span key={hash} className="badge text-bg-primary hashtag">
            {hash}
          </span>
        ))}
        <div className="alert alert-info reaction" role="alert">
          This Post has been liked by {post.reactions.likes} peoples.
        </div>
      </div>
    </div>
  );
};
export default Post;
