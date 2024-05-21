import React, { useContext } from "react";
import { Context } from "../ContextProvider";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { state, dispath } = useContext(Context);
  return state.currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
