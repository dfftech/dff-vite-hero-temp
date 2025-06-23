import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { LoginValidate } from "./common/validate";

import { checkLoginUser } from "@/utils/services/app.util";
import { CheckSession, RouterChange } from "@/utils/services/app.event";
import { AppRouter } from "@/utils/services/app.router";
import TypeInput from "@/types/type.input";
import TypeButton from "@/types/type.button";
import AppStorage, { TOKEN } from "@/utils/services/app.storage";
import { AuthLayout } from "@/layouts/auth-layout";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

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
    setIsLoading(true);
    try {
      console.log("Form Data:", data);
      AppStorage.setData(TOKEN, "dummy_token_value");
      CheckSession();
      RouterChange(AppRouter.ACCOUNT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="flex flex-col items-center justify-center p-4">
          <section className="w-full p-2">
            <h2 className="text-2xl font-semibold text-center mb-6">
              {t("signIn")}
            </h2>
            <form>
              <div className="flex flex-col gap-4">
                <TypeInput
                  control={control}
                  error={errors.email}
                  label={t("email")}
                  name="email"
                  rules={LoginValidate.email}
                  type="text"
                />

                <TypeInput
                  control={control}
                  error={errors.password}
                  label={t("password")}
                  name="password"
                  rules={LoginValidate.password}
                  type="password"
                />

                {/* Submit Button */}
                <div className="flex justify-between">
                  <TypeButton
                    action="primary"
                    label={t("forgotPassword")}
                    variant="light"
                    onPress={() => RouterChange(AppRouter.FORGOT_PASSWORD)}
                  />
                  <TypeButton
                    action="primary"
                    disabled={isLoading}
                    isLoading={isLoading}
                    label={isLoading ? t("loading") : t("login")}
                    variant="solid"
                    onPress={handleSubmit(onSubmit)}
                  />
                </div>
              </div>
            </form>
            <div className="mt-4 text-center flex justify-center flex-col lg:flex-row md:flex-row">
              <p className="text-sm text-gray-600">
                {t("noAccount")}&nbsp;
                <TypeButton
                  action="primary"
                  className="p-0"
                  label={t("signUp")}
                  variant="light"
                  onPress={() => RouterChange(AppRouter.SIGNUP)}
                />
              </p>
            </div>
          </section>
        </div>
      </AuthLayout>
    </>
  );
}
