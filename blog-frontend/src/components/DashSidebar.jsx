import React, { useState, useEffect, useContext } from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser, HiDocumentText } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../ContextProvider.jsx";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = () => {
    try {
      const data = axios.post("/api/user/signout");
      dispatch({ type: "signOutSuccess" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
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
