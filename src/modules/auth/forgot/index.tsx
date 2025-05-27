import { ContentLayout } from "@/layouts/content-layout";
import { useEffect, useState } from "react";
import {
  InputOtp,
} from "@heroui/react";
import { checkLoginUser } from "@/utils/app.methods";
import { RouterChange } from "@/utils/app.event";
import { AppRouter } from "@/utils/app.router";
import { TypeInput } from "@/types/type.input";
import { useForm } from "react-hook-form";
import TypeButton from "@/types/type.button";

export default function ForgotPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(""); // for error message

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
    console.log("Email Submitted:", data);
    setIsSubmitted(true);
  };

  // OTP submit
  const onSubmitOtp = () => {
    if (otp.length < 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    setOtpError("");
    console.log("OTP submitted:", otp);
    RouterChange(AppRouter.ACCOUNT);
  };

  const onCancelOtp = () => {
    setOtp("");
    setOtpError("");
    setIsSubmitted(false);
  };

  const onCancel = () => {
    RouterChange(AppRouter.LOGIN);
  };

  return (
    <ContentLayout>
      <div className="flex flex-col items-center justify-center p-4">
        <section className="w-full md:w-7/12 p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit(onSubmitEmail)}>
              <div className="flex flex-col gap-4">
                <TypeInput
                  control={control}
                  name="email"
                  label="Email"
                  type="text"
                  rules={{ required: "Email is required" }}
                  error={errors.email}
                />
                <div className="flex justify-between gap-4">
                  <TypeButton
                    name="CornerUpLeft"
                    label="Back to Login"
                    action="danger"
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
                    value={otp}
                    onValueChange={(val: string) => {
                      setOtp(val);
                      if (val.length === 6) setOtpError("OTP must be 6 digits");
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
                  name="CornerUpLeft"
                  label="Back to Login"
                  action="danger"
                  onPress={onCancelOtp}
                />
                <TypeButton
                  label="Submit"
                  onPress={onSubmitOtp}
                  disabled={otp.length < 6}
                  className={otp.length === 6
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-200 text-white cursor-not-allowed"}
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </ContentLayout>
  );
}
