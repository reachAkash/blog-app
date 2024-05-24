import React, { useState, useEffect, useContext } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiUser,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../ContextProvider.jsx";
import axiosInstance from "../../utils/axiosInstance";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = () => {
    try {
      const data = axiosInstance.post(`/api/user/signout`);
      dispatch({ type: "signOutSuccess" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {state.currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item active={tab == "dash" || !tab} icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={state.currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {state.currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item active={tab == "posts"} icon={HiDocumentText}>
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {state.currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item active={tab == "users"} icon={HiOutlineUserGroup}>
                Users
              </Sidebar.Item>
            </Link>
          )}
          {state.currentUser.isAdmin && (
            <Link to="/dashboard?tab=comments">
              <Sidebar.Item active={tab == "comments"} icon={HiAnnotation}>
                Comments
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            onClick={handleSignOut}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
