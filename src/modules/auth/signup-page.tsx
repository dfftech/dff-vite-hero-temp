import { useEffect, useState } from "react";
import { InputOtp } from "@heroui/react";
import { useForm } from "react-hook-form";

import { checkLoginUser } from "@/utils/app.methods";
import { RouterChange } from "@/utils/app.event";
import { AppRouter } from "@/utils/app.router";
import { TypeInput } from "@/types/type.input";
import TypeButton from "@/types/type.button";
import { AuthLayout } from "@/layouts/auth-layout";
import { SignUpValidate } from "./common/validate";

export default function SignUpPage() {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  useEffect(() => {
    const isLogin = checkLoginUser();

    if (isLogin) {
      RouterChange(AppRouter.HOME);
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    setIsEmailSubmitted(true); // Set submitted state
  };

  const onCancelOtp = () => {
    setIsEmailSubmitted(false); // ✅ Return to sign-up form
  };

  const handleOtp = async (otp: number) => {
    // const resp: any = await verifySignUp(otp, otpId);
  };

  const onCancel = () => {
    RouterChange(AppRouter.LOGIN);
  };

  const SignUpForm = () => {
    return (
      <form>
        <div className="flex flex-col gap-4">
          <TypeInput
            control={control}
            error={errors.email}
            label="Full Name"
            name="name"
            rules={SignUpValidate.name}
          />
          <TypeInput
            control={control}
            error={errors.email}
            label="Email"
            name="email"
            rules={SignUpValidate.email}
          />
          <TypeInput
            control={control}
            error={errors.mobile}
            label="Mobile Number"
            name="mobileNumber"
            rules={SignUpValidate.phone}
          />
          <TypeInput
            control={control}
            error={errors.password}
            label="Password"
            name="password"
            rules={SignUpValidate.password}
          />

          <div className="flex justify-between gap-4">
            <TypeButton
              action="danger"
              label="Back to Login"
              name="CornerUpLeft"
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
    )
  };

  const SignUpOtp = () => {
    return (
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
    );
  };

  const RenderSection = () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center p-4">
          <section className="w-full p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
            {!isEmailSubmitted ? (
              <SignUpForm />
            ) : (
              <SignUpOtp />
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
