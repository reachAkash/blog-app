import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const data = await axios.get(`/api/user/${comment.userId}`);
      setUser(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3 ">
        <img
          className="w-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate ">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-sm text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
