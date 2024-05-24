import React, { useContext, useState, useEffect } from "react";
import { Context } from "../ContextProvider.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Textarea, Modal } from "flowbite-react";
import Comment from "./Comment.jsx";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axiosInstance from "../../utils/axiosInstance.js";

const CommentSection = ({ postId }) => {
  const { state, dispatch } = useContext(Context);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const data = await axiosInstance.post(`/api/comment/create`, {
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

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!state.currentUser) {
        navigate("/sign-in");
        return;
      }
      const data = await axiosInstance.delete(
        `/api/comment/deletecomment/${commentId}`
      );
      setComments(comments.filter((comment) => comment._id != commentId));
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(comment)

  const handleLike = async (commentId) => {
    try {
      if (!state.currentUser) {
        navigate("/sign-in");
        return;
      }
      const data = await axiosInstance.put(
        `/api/comment/likecomment/${commentId}`
      );
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
      const data = await axiosInstance.get(
        `/api/comment/getpostcomments/${postId}`
      );
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
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            );
          })}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg to-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;
