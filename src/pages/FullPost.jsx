import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock/CommentsBlock";
import { fetchComments } from "../redux/slices/comments";

export const FullPost = () => {
  const [post, setPost] = React.useState();
  const [comments, setComments] = React.useState([]);
  const [isPostLoading, setPostLoading] = React.useState(true);
  const [isCommentsLoading, setCommentsLoading] = React.useState(true);
  const { id } = useParams();

  const [commentToAdd, setCommentToAdd] = React.useState("");

  React.useEffect(() => {
    setPostLoading(true);
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setPostLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting post");
      });
  }, [id]);

  const fetchComments = () => {
    setCommentsLoading(true);
    axios
      .get(`/posts/${id}/comments`)
      .then((res) => {
        setComments(res.data);
        setCommentsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error getting comments");
      });
  };
  React.useEffect(() => {
    fetchComments();
  }, [id]);

  if (isPostLoading || !post) {
    return <Post isPostLoading isFullPost />;
  }

  const HandleCommentEnter = (event) => {
    setCommentToAdd(event.target.value);
  };

  const HandleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/posts/${id}/comment`, {
        text: commentToAdd,
      });
      setCommentToAdd("");

      const res = await axios.get(`/posts/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      console.warn(err);
      alert("Error sending comment!");
    }
  };

  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        imageUrl={
          post.imageUrl
            ? `${process.env.REACT_APP_API_URL}${post.imageUrl}`
            : ""
        }
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={comments.length}
        tags={post.tags}
        isFullPost
      >
        <ReactMarkdown children={post.text} />
      </Post>
      <CommentsBlock
        comments={comments}
        isCommentsLoading={false}
        onCommentsChange={fetchComments}
      >
        <Index
          HandleCommentEnter={HandleCommentEnter}
          commentToAdd={commentToAdd}
          HandleCommentSubmit={HandleCommentSubmit}
        />
      </CommentsBlock>
    </>
  );
};
