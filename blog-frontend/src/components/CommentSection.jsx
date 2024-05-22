import React, { useContext, useState } from "react";
import { Context } from "../ContextProvider.jsx";
import { Link } from "react-router-dom";
import { Button, Textarea } from "flowbite-react";

const CommentSection = ({ postId }) => {
  const { state, dispatch } = useContext(Context);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {};
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
        </form>
      )}
    </div>
  );
};

export default CommentSection;
