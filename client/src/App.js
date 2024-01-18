import { useState, useEffect } from "react";
//Component
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/layout/Navbar";

//Notify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Router
import { Routes, Route } from "react-router-dom";
//pages
import Home from "./components/pages/Home";
import Login from "../src/components/pages/auth/Login";
import Register from "../src/components/pages/auth/Register";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import UserDashboard from "./components/pages/user/UserDashboard";
//import  user route
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminCreatePerson from "./components/pages/admin/AdminCreatePerson";
import AdminUpdatePerson from "./components/pages/admin/AdminUpdatePerson";
//Redux
import { useDispatch } from "react-redux";

//import  functon
import { currentUser } from "./components/functions/auth";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const idTokenResult = localStorage.token;
    // console.log("app:",idTokenResult);
    if (idTokenResult) {
      currentUser(idTokenResult)
        .then((res) => {
          // console.log("App", res);
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              token: idTokenResult,
              role: res.data.role,
              id: res.data._id,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-person" element={<AdminCreatePerson />} />
          <Route path="/admin/update-person/:id" element={<AdminUpdatePerson />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
