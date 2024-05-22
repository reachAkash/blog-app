import React, { useContext } from "react";
import { Context } from "../ContextProvider";
import { Outlet, Navigate } from "react-router-dom";

const OnlyAdminPrivateRoute = () => {
  const { state, dispath } = useContext(Context);
  console.log(state);
  return state.currentUser && state.currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default OnlyAdminPrivateRoute;
