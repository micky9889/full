import React, { useState, useEffect } from "react";
import { Outlet, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
//function
import { currentAdmin } from "../functions/auth";

const AdminRoute = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          // console.log("Current Admin", res);
          setOk(true);
        })
        .catch((err) => {
          console.log("amin route error", console.error());
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Outlet /> : <LoadingToRedirect />;
};

export default AdminRoute;
