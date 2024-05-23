import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../ContextProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "./PostCard";

const Home = () => {
  const { state, dispatch } = useContext(Context);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await axios("/api/post/getposts");
      setPosts(data.data.posts);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to <span className="text-purple-500">Akash's</span> Blogs.
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          temporibus ad libero expedita optio? Voluptate!
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        ></Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => {
                return <PostCard key={post._id} post={post} />;
              })}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
