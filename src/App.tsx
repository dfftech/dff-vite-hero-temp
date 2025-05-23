import { Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import { effect } from "@preact/signals-react";

import { RouterEvent, ShowToast } from "./utils/app.event";
import Toast from "./components/toast";
import DefaultLayout from "./layouts/default-layout";

import AccountRoute from "@/app/account";
import IndexRoute from "@/app/index";

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
          <Route element={<IndexRoute />} path="/" />
          <Route element={<AccountRoute />} path="/account" />
        </Routes>
      </DefaultLayout>
    </>
  );
}

export default App;
