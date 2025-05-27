import { signal } from "@preact/signals-react";
import { jwtDecode } from "jwt-decode";

import { GoogleUserResponseType, UserSignIn } from "./types";

import { RouterChange, ShowToast } from "@/utils/app.event";
import AppHttp from "@/utils/app.http";
import AppStorage, { GOOGLE_ACCESS_TOKEN, SESSION_INFO, TOKEN } from "@/utils/app.storage";
// import {
//   onFetchProfile,
//   UserSubscriptionState,
// } from "@/modules/profile/common/service";
import { AppRouter } from "@/utils/app.router";
import { AuthStateType, SessionInfoType } from "@/utils/app.types";

AppHttp.getInstance();

export const AuthState = signal<AuthStateType>({} as AuthStateType);

export const UserSignInSignal = signal<UserSignIn>({} as UserSignIn);

export const getgoogleClientId = (): string => {
  let googleClientId = process.env.REACT_APP_GOOGLE_WEB_CLIENT_ID || "";

  if (typeof window !== "undefined" && (window as any).env) {
    googleClientId = (window as any).env.REACT_APP_GOOGLE_WEB_CLIENT_ID || googleClientId;
  }

  return googleClientId;
};

export const ApiInitiateGoogleSignin = async (user: GoogleUserResponseType) => {
  const res = await AppHttp.Post(AppHttp.AUTH_MS_HOST + "/auth/google/signin", {
    email: user.email,
    name: user.name,
    pic: user.pic,
    provider: user.provider,
    type: user.type,
    isEmailVerified: user.isEmailVerified || false,
  });

  if (res && res.data) {
    let token = res.data as string;

    AppStorage.setData(TOKEN, token, true);
    await loadAuth();
    RouterChange(AppRouter.HOME);
    ShowToast("Login Successful", "success");
  }

  if (res && res.error) {
    console.error("Authentication error: ", res.error);
    ShowToast("Something went wrong, please try again later.", "warning");
  }
};

export const loadAuth = async () => {
  const token: string = await AppStorage.getData(TOKEN, true);

  console.log("token", token);
  if (token) {
    const sessionInfo: SessionInfoType = jwtDecode(token);

    delete sessionInfo.key;
    AppStorage.setData(SESSION_INFO, JSON.stringify(sessionInfo), true);
    AuthState.value = {
      isAuthenticated: true,
      token: token,
      userId: sessionInfo.id,
    };
    // await onFetchProfile(sessionInfo.id);
  } else {
    await logout();
  }
};

export const logout = async () => {
  console.log("logout");
  AppStorage.removeData(TOKEN, true);
  AppStorage.removeData(SESSION_INFO, true);
  AppStorage.removeData(GOOGLE_ACCESS_TOKEN, true);
  AuthState.value = { isAuthenticated: false, token: null, userId: null };
  // UserSubscriptionState.value.isSubscribed = false;
};

export const verifySignIn = async () => {
  const res = await AppHttp.Post(AppHttp.AUTH_MS_HOST + "/auth/signin", UserSignInSignal.value);

  // console.log(res?.data.success);
  if (res?.data?.success) {
    ShowToast("Login Successful", "success");
    let token = res.data.data.jwt as string;

    AppStorage.setData(TOKEN, token, true);
    await loadAuth();
    RouterChange(AppRouter.HOME);
  } else if (!res?.error && !res?.data?.success) {
    ShowToast(res?.data?.message, "warning");
  } else {
    ShowToast(res?.error, "warning");
  }
};
