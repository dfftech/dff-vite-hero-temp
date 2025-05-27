import { signal } from "@preact/signals-react";

import { SignUpType } from "./type";

export const SignUpSignal = signal<SignUpType>({} as SignUpType);

export const EnabledButtons = signal<boolean>(false);

export const signUpSerice = async () => {
  // const res = await AppHttp.Post(
  //   AppHttp.AUTH_MS_HOST + "/auth/signUp",
  //   SignUpSignal.value
  // );
  // return res;
};

export const verifySignUp = async (otp: number, id: string) => {
  // const res = await AppHttp.Post(
  //   AppHttp.AUTH_MS_HOST + "/auth/verify-otp", {
  //   otp, id
  // }
  // );
  // if (res && res.data.success) {
  //   let token = res.data.data.token as string;
  //   RouterChange(AppRouter.HOME);
  //   AppStorage.setData(TOKEN, token, true);
  //   await loadAuth();
  //   ShowToast("Login Successful", "success");
  // }
  // if (res && !res.data.success) {
  //   ShowToast(res.data.message, "warning");
  // }
  // if (res && res.error) {
  //   console.error("Authentication error: ", res.error);
  //   ShowToast("OTP Verification Failed.", "warning");
  // }
  // return res;
};
