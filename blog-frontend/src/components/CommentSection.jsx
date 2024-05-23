import React, { useContext, useState, useEffect } from "react";
import { Context } from "../ContextProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import axios from "axios";
import Comment from "./Comment.jsx";

const CommentSection = ({ postId }) => {
  const { state, dispatch } = useContext(Context);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const data = await axios.post("/api/comment/create", {
        content: comment,
        postId,
        userId: state.currentUser._id,
      });
      setComment("");
      setCommentError("");
      getComments();
    } catch (err) {
      console.log(err);
      setCommentError(err.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  // console.log(comment)

  const handleLike = async (commentId) => {
    try {
      if (!state.currentUser) {
        navigate("/sign-in");
        return;
      }
      const data = await axios.put(`/api/comment/likecomment/${commentId}`);
      setComments(
        comments.map((comment) => {
          return comment._id === commentId
            ? {
                ...comment,
                likes: data.data.likes,
                numberOfLikes: data.data.likes.length,
              }
            : comment;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  const getComments = async () => {
    try {
      const data = await axios.get(`/api/comment/getpostcomments/${postId}`);
      setComments(data.data);
      console.log(data);
    } catch (err) {
      setCommentError(err.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {state.currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as : </p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={state.currentUser.profilePicture}
            alt=""
          />
          <Link to={`/dashboard?tab=profile`} className="text-xs text-cyan-600">
            @{state.currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.{" "}
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            sign in
          </Link>
        </div>
      )}
      {state.currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert className="mt-5" color="failure">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p>No comments yet!</p>
      ) : (
        <>
          <div className="flex items-center my-5 text-sm gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments?.map((comment) => {
            return (
              <Comment
                comment={comment}
                key={comment._id}
                onLike={handleLike}
                onEdit={handleEdit}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default CommentSection;
