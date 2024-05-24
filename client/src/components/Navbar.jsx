import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { Context } from "../ContextProvider";
import axiosInstance from "../../utils/axiosInstance";

const NavbarComp = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSignOut = () => {
    try {
      const data = axiosInstance.post(`/api/user/signout`);
      dispatch({ type: "signOutSuccess" });
      localStorage.removeItem("token");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    console.log("im here in navbar");
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleAdminAccess = async (e) => {
    try {
      const data = await axiosInstance.put(
        `/api/user/getadminaccess?userId=${state.currentUser._id}`
      );
      // console.log(data);
      dispatch({ type: "signInSuccess", payload: data.data });
      navigate("/dashboard?tab=profile");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="py-1 text-purple-500">Akash's</span> Blog
      </Link>
      <form onSubmit={handleSubmit} action="">
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className="w-12 h-10 lg:hidden flex items-center justify-center"
        color="gray"
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch({ type: "toggleTheme" })}
        >
          {state.theme == "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {state.currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user"
                img={state.currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                @{state.currentUser.username}
              </span>
              <span className="block text-sm font-medium truncate">
                {state.currentUser.email}
              </span>
            </Dropdown.Header>

            <Dropdown.Item
              disabled={state.currentUser.isAdmin}
              className={`${
                state.currentUser.isAdmin &&
                "disabled:opacity-70 disabled:cursor-not-allowed"
              }`}
              onClick={handleAdminAccess}
            >
              Admin Access
            </Dropdown.Item>

            <Dropdown.Divider />
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign in
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;
