import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../ContextProvider";
import OAuth from "../components/OAuth";
import axiosInstance from "../../utils/axiosInstance";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { state, dispatch } = useContext(Context);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(formData.email && formData.password)) {
      return dispatch({
        type: "signInFailure",
        payload: "Please fill out all fields",
      });
    }
    try {
      dispatch({ type: "signInStart" });
      const data = await axiosInstance.post(`/api/auth/signin`, formData);
      console.log(data);
      dispatch({ type: "signInSuccess", payload: data.data });
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch({ type: "signInFailure", payload: error.response.data.message });
    }
  };

  return (
    <div className="min-h-screen mt-20 font-montserrat">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-4">
        {/* left section */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="py-1 text-purple-500">Akash's</span> Blog
          </Link>
          <p className="text-sm mt-5">
            This is a blog project. You can sign in Using Google Auth or email &
            password.
          </p>
        </div>
        {/* right section */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={state.loading}
            >
              {state.loading ? (
                <>
                  <Spinner size="sm"></Spinner>
                  <span className="pl-3"> Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </div>
          {state.error && (
            <Alert className="mt-5" color="failure">
              {state.error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
