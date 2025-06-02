import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { effect } from "@preact/signals-react";

import { RouterEvent, ShowToast } from "@/utils/services/app.event";
import AppToast from "@/utils/components/app-toast";
import DefaultLayout from "./layouts/default-layout";
import { AppRouter } from "@/utils/services/app.router";
import SignUp from "./app/auth/signup";
import ForgotPassword from "./app/auth/forgotpassword";
import Login from "./app/auth/login";
import Account from "./app/account";
import Profile from "./app/profile";
import Permissions from "./app/permissions";

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    ShowToast("Welcome message !!!!", "success");
    effect(() => {
      const path = RouterEvent.value.pathname;
      const queryString = new URLSearchParams(
        RouterEvent.value.query ?? {},
      ).toString();

      if (path) {
        const fullPath = queryString ? `${path}?${queryString}` : path;

        if (window.location.pathname + window.location.search !== fullPath) {
          navigate(fullPath);
        }
      }
    });
  }, []);

  return (
    <>
      <AppToast />
      <DefaultLayout>
        <Routes>
          <Route element={<Login />} path={AppRouter.DEFAULT} />
          <Route element={<Login />} path={AppRouter.LOGIN} />
          <Route element={<SignUp />} path={AppRouter.SIGN_UP} />
          <Route
            element={<ForgotPassword />}
            path={AppRouter.FORGOT_PASSWORD}
          />
          <Route element={<Account />} path={AppRouter.ACCOUNT} />
          <Route element={<Profile />} path={AppRouter.PROFILE} />
          <Route element={<Permissions />} path={AppRouter.PERMISSIONS} />
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
