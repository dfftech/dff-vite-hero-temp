import { useEffect } from "react";
import { InputOtp } from "@heroui/react";
import { useForm } from "react-hook-form";
import React from "react";

import { ContentLayout } from "@/layouts/content-layout";
import { checkLoginUser } from "@/utils/app.methods";
import { RouterChange } from "@/utils/app.event";
import { AppRouter } from "@/utils/app.router";
import { TypeInput } from "@/types/type.input";
import TypeButton from "@/types/type.button";
import { AuthLayout } from "@/layouts/auth-layout";

export async function SignUpPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  useEffect(() => {
    const isLogin = checkLoginUser();

    if (isLogin) {
      RouterChange(AppRouter.HOME);
    }
  }, []);

  const RenderSection = () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
      console.log("Form Data:", data);
      setIsSubmitted(true); // Set submitted state
    };

    const onCancelOtp = () => {
      setIsSubmitted(false); // ✅ Return to sign-up form
    };

    const handleOtp = async (otp: number) => {
      // const resp: any = await verifySignUp(otp, otpId);
    };

    const onCancel = () => {
      RouterChange(AppRouter.LOGIN);
    };

    return (
      <>
        <div className="flex flex-col items-center justify-center p-4">
          <section className="w-full p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
            {!isSubmitted ? (
              <form>
                <div className="flex flex-col gap-4">
                  <TypeInput
                    control={control}
                    error={errors.email}
                    label="Full Name"
                    name="name"
                    rules={{ required: "Name is required" }}
                    type="text" // or "email" if you extend your TypeInput's `type` prop to include "email"
                  />
                  <TypeInput
                    control={control}
                    error={errors.email}
                    label="Email"
                    name="email"
                    rules={{ required: "Email is required" }}
                    type="text" // or "email" if you extend your TypeInput's `type` prop to include "email"
                  />

                  <TypeInput
                    control={control}
                    error={errors.password}
                    label="Password"
                    name="password"
                    rules={{ required: "Password is required" }}
                    type="password"
                  />
                  <TypeInput
                    control={control}
                    error={errors.password}
                    label="Re-enter Password"
                    name="reEnterPassword"
                    rules={{ required: "ReEnter Password is required" }}
                    type="password"
                  />
                  <div className="flex justify-between gap-4">
                    <TypeButton
                      action="danger"
                      name="CornerUpLeft"
                      label="Back to Login"
                      onPress={onCancel}
                    />
                    {/* Submit Button */}
                    <TypeButton
                      label="Submit"
                      onPress={() => handleSubmit(onSubmit)()}
                    />
                  </div>

                </div>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-lg text-gray-700">
                  OTP has been sent successfully!
                </p>

                {/* ✅ OTP Input Field */}
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4 ml-1 mt-4 items-center justify-center">
                  <InputOtp
                    description="Enter your OTP"
                    length={6}
                    onChange={(event) => {
                      const target = event.target as HTMLInputElement;

                      if (target.value.length === 6) {
                        handleOtp(Number(target.value));
                      }
                    }}
                  />
                </div>

                {/* ✅ OTP Buttons */}
                <div className="flex justify-between mt-4 space-x-4">
                  <TypeButton
                    action="danger"
                    label="Cancel"
                    name="CircleX"
                    onPress={onCancelOtp}
                  />
                  {/* <TypeButton
                    label="Verify OTP"
                    onPress={handleOtp}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                  /> */}
                </div>
              </div>
            )}
          </section>
        </div>
      </>
    );
  };

  return (
    <>
      <AuthLayout>
        <RenderSection />
      </AuthLayout>
    </>
  );
}
