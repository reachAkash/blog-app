import React from "react";
import { useContext } from "react";
import { Context } from "../ContextProvider";

const Home = () => {
  const { state, dispatch } = useContext(Context);
  console.log(state);
  return <div>Home</div>;
};

export default Home;
