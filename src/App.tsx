import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { effect } from "@preact/signals-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

import DefaultLayout from "./layouts/default-layout";
import SignUp from "./app/auth/signup";
import ForgotPassword from "./app/auth/forgot-password";
import Login from "./app/auth/login";
import Account from "./app/account";
import Profile from "./app/profile";
import Permissions from "./app/permissions";
import AppHttp from "./utils/services/app.http";
import TestForm from "./app/test-form";

import { AppRouter } from "@/utils/services/app.router";
import AppToast from "@/utils/components/app-toast";
import { RouterEvent, ShowToast } from "@/utils/services/app.event";

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    AppHttp.BaseUrl();
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
          <Route element={<SignUp />} path={AppRouter.SIGNUP} />
          <Route
            element={<ForgotPassword />}
            path={AppRouter.FORGOT_PASSWORD}
          />
          <Route element={<Account />} path={AppRouter.ACCOUNT} />
          <Route element={<Profile />} path={AppRouter.PROFILE} />
          <Route element={<Permissions />} path={AppRouter.PERMISSIONS} />
          <Route element={<TestForm />} path={AppRouter.TEST_FORM} />
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
