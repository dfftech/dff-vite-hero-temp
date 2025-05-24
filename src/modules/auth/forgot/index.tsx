import { ContentLayout } from "@/layouts/content-layout";
import { useEffect } from "react";
import {
  InputOtp,
} from "@heroui/react";
import { checkLoginUser } from "@/utils/app.methods";
import { RouterChange } from "@/utils/app.event";
import { AppRouter } from "@/utils/app.router";
import { TypeInput } from "@/types/type.input";
import { useForm } from "react-hook-form";
import TypeButton from "@/types/type.button";
import React from "react";

export async function ForgotPage() {
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
    return (
      <>
        <div className="flex flex-col items-center justify-center p-4">
          <section className="w-full md:w-7/12 lg:w-7/12 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
            {!isSubmitted ? (
              <form>
                <div className="flex flex-col gap-4">
                  <TypeInput
                    control={control}
                    name="email"
                    label="Email"
                    type="text" // or "email" if you extend your TypeInput's `type` prop to include "email"
                    rules={{ required: "Email is required" }}
                    error={errors.email}
                  />
                  {/* Submit Button */}
                  <TypeButton
                    label="Submit"
                    onPress={() => handleSubmit(onSubmit)()}
                  />
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
                    name="CircleX"
                    label="Cancel"
                    action="danger"
                    onPress={onCancelOtp}
                  />
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
      <ContentLayout>
        <RenderSection />
      </ContentLayout>
    </>
  );
}
