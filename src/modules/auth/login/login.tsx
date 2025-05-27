import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useForm } from "react-hook-form";

import { ContentLayout } from "@/layouts/content-layout";
import { checkLoginUser } from "@/utils/app.methods";
import { CheckSession, RouterChange } from "@/utils/app.event";
import { AppRouter } from "@/utils/app.router";
import { TypeInput } from "@/types/type.input";
import TypeButton from "@/types/type.button";
import AppStorage, { TOKEN } from "@/utils/app.storage";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = useDisclosure();

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
      AppStorage.setData(TOKEN, "dummy_token_value");
      CheckSession();
      RouterChange(AppRouter.ACCOUNT);

    };

    return (
      <>
        <div className="flex flex-col items-center justify-center p-4">
          <section className="w-full md:w-7/12 lg:w-7/12 p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
            <form>
              <div className="flex flex-col gap-4">
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

                {/* Submit Button */}
                <div className="flex justify-between">

                  <TypeButton
                    action="primary"
                    label="Forgot Password?"
                    variant="light"
                    onPress={() => RouterChange(AppRouter.FORGOT_PASSWORD)}
                  />
                  <TypeButton
                    action="primary"
                    disabled={isLoading}
                    isLoading={isLoading}
                    label={isLoading ? "Logging in..." : "Log In"}
                    variant="solid"
                    onPress={handleSubmit(onSubmit)}
                  />
                </div>

              </div>
            </form>
            <div className="mt-4 text-center flex justify-center flex-col lg:flex-row md:flex-row">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?&nbsp;
                <TypeButton
                  action="primary"
                  className="p-0"
                  label="Sign Up"
                  variant="light"
                  onPress={() => RouterChange(AppRouter.SIGN_UP)}
                />
              </p>

            </div>
          </section>
        </div>
        <Modal
          className="bg-primary text-white p-2 rounded-lg mt-20"
          isOpen={isOpen}
          placement="center"
          onClose={onClose}
        >
          <ModalContent>
            <ModalBody>
              <p className="text-sm text-gray-600">
                Please enter your credentials to log in.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button className="text-white" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                className="text-white"
                onPress={() => alert("Proceeding with login")}
              >
                Proceed
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
