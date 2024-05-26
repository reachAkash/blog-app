import React, { useContext } from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { Context } from "../ContextProvider";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const OAuth = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);

  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const data = await axiosInstance.post(`/api/auth/google`, {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoUrl: resultsFromGoogle.user.photoURL,
      });
      console.log(data);
      localStorage.setItem("token", data.data.token);
      dispatch({ type: "signInSuccess", payload: data.data.user });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      onClick={handleGoogleClick}
      gradientDuoTone="pinkToOrange"
      outline
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
