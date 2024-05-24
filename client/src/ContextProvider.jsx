import React, { createContext, useEffect, useReducer } from "react";
import axiosInstance from "../utils/axiosInstance";

const Context = createContext();

const Provider = ({ children }) => {
  const initialState = {
    value: 69,
    loading: false,
    error: null,
    currentUser: null,
    theme: "light",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "signInStart":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "signInSuccess":
        return {
          ...state,
          currentUser: action.payload,
          loading: false,
          error: null,
        };
      case "signInFailure":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case "toggleTheme":
        return {
          ...state,
          theme: state.theme == "light" ? "dark" : "light",
        };
      case "updateStart":
        return {
          ...state,
          loading: true,
          error: null,
        };
      case "updateSuccess":
        return {
          ...state,
          currentUser: action.payload,
          loading: false,
          error: null,
        };
      case "updateFailure": {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case "deleteUserStart": {
        return {
          ...state,
          loading: true,
          error: null,
        };
      }
      case "deleteUserSuccess": {
        return {
          ...state,
          currentUser: null,
          loading: false,
          error: null,
        };
      }
      case "deleteUserFailure": {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case "signOutSuccess": {
        return {
          ...state,
          currentUser: null,
          error: false,
          loading: false,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const verifyUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await axiosInstance.post(
        `/api/auth/verifyuser`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: "signInSuccess", payload: data.data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
