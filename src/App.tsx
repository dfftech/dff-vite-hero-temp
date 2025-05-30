import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { effect } from "@preact/signals-react";

import { RouterEvent, ShowToast } from "./utils/app.event";
import Toast from "./components/toast";
import DefaultLayout from "./layouts/default-layout";
import { AppRouter } from "./utils/app.router";
import SignUp from "./app/signup";
import ForgotPassword from "./app/forgotpassword";
import Login from "./app/login";
import Account from "./app/account";

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
      <Toast />
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
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
