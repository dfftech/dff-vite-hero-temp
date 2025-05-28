import { useEffect, useState } from "react";
import { InputOtp } from "@heroui/react";
import { useForm } from "react-hook-form";

import { checkLoginUser } from "@/utils/app.methods";
import { RouterChange } from "@/utils/app.event";
import { AppRouter } from "@/utils/app.router";
import { TypeInput } from "@/types/type.input";
import TypeButton from "@/types/type.button";
import { AuthLayout } from "@/layouts/auth-layout";

export default function ForgotPasswordPage() {
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");

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

  // Email form submit
  const onSubmitEmail = (data: any) => {
    setIsEmailSubmitted(true);
  };

  // OTP submit
  const onSubmitOtp = () => {
    if (otpValue.length < 6) {
      setOtpError("OTP must be 6 digits");

      return;
    }

    setOtpError("");
    RouterChange(AppRouter.LOGIN);
  };

  const onCancelOtp = () => {
    setOtpValue("");
    setOtpError("");
    setIsEmailSubmitted(false);
  };

  const onCancel = () => {
    RouterChange(AppRouter.LOGIN);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center p-4">
        <section className="w-full">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Forgot Password
          </h2>

          {!isEmailSubmitted ? (
            <form onSubmit={handleSubmit(onSubmitEmail)}>
              <div className="flex flex-col gap-4">
                <TypeInput
                  control={control}
                  error={errors.email}
                  label="Email"
                  name="email"
                  rules={{ required: "Email is required" }}
                  type="text"
                />
                <div className="flex justify-between gap-4">
                  <TypeButton
                    action="danger"
                    label="Back to Login"
                    name="CornerUpLeft"
                    onPress={onCancel}
                  />
                  <TypeButton
                    label="Submit"
                    onPress={handleSubmit(onSubmitEmail)}
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-700">
                OTP has been sent successfully!
              </p>

              <div className="flex flex-col items-center mt-4">
                <div className="flex justify-center">
                  <InputOtp
                    description="Enter your OTP"
                    length={6}
                    value={otpValue}
                    onValueChange={(value: string) => {
                      setOtpValue(value);
                      if (value.length === 6) setOtpError("OTP must be 6 digits");
                    }}
                  />
                </div>

                {/* Reserve space for error to avoid layout shift */}
                <p className="text-sm text-red-600 mt-2 min-h-[20px]">
                  {otpError ? "OTP must be 6 digits" : ""}
                </p>
              </div>

              <div className="flex justify-between mt-4 space-x-4">
                <TypeButton
                  action="danger"
                  label="Back to Login"
                  name="CornerUpLeft"
                  onPress={onCancelOtp}
                />
                <TypeButton
                  className={
                    otpValue.length === 6
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-200 text-white cursor-not-allowed"
                  }
                  disabled={otpValue.length < 6}
                  label="Submit"
                  onPress={onSubmitOtp}
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </AuthLayout>
  );
}
