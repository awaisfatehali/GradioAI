import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify"; // ✅ import Bounce
import "react-toastify/dist/ReactToastify.css"; // ✅ import CSS
import Store from "../src/redux/store.js";
import { loadUser } from "../src/redux/actions/user.js";
import { getAllGradAssignment } from "../src/redux/actions/assignment.js";
import { getAllClasses } from "../src/redux/actions/class.js";
import {
  HomePage,
  SignUpPage,
  LoginPage,
  DashBoardPage,
  AboutPage,
  VerifyPage,
  ProfilePage,
  HistoryPage,
  AssignmentPage,
  AssignmentList,
  ResetPasswordPage
} from "./routes/routes.js";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    if (user) {
      Store.dispatch(getAllGradAssignment(user._id));
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      Store.dispatch(getAllClasses(user._id));
    }
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignment/:id"
          element={
            <ProtectedRoute>
              <AssignmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classeview/:id"
          element={
            <ProtectedRoute>
              <AssignmentList />
            </ProtectedRoute>
          }
        />
        
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/activation/:activation_token" element={<VerifyPage />} />
        <Route path="/resetpassword/:reset_token" element={<ResetPasswordPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="coloured"
        transition={Bounce} // ✅ now works
      />
    </>
  );
};

export default App;
