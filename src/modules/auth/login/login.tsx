import { ContentLayout } from "@/layouts/content-layout";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { checkLoginUser } from "@/utils/app.methods";
import { RouterChange } from "@/utils/app.event";
import { AppRouter } from "@/utils/app.router";
import { TypeInput } from "@/types/type.input";
import { useForm } from "react-hook-form";
import TypeButton from "@/types/type.button";

export async function LoginPage() {

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
    };
    return (
      <>
        <div className="flex flex-col items-center justify-center p-4">
          <section className="w-full md:w-7/12 lg:w-7/12 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
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

                <TypeInput
                  control={control}
                  name="password"
                  label="Password"
                  type="password"
                  rules={{ required: "Password is required" }}
                  error={errors.password}
                />

                {/* Submit Button */}
                <TypeButton
                  label={isLoading ? "Logging in..." : "Log In"}
                  onPress={handleSubmit(onSubmit)}
                  variant="solid"
                  action="primary"
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              </div>
            </form>
            <div className="mt-4 text-center flex justify-between">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <TypeButton
                  label="Sign Up"
                  onPress={() => RouterChange(AppRouter.SIGN_UP)}
                  variant="light"
                  action="primary"
                  className="p-0"
                />
              </p>
              <TypeButton
                label="Forgot Password?"
                onPress={() => RouterChange(AppRouter.FORGOT_PASSWORD)}
                variant="light"
                action="primary"
                className="p-0"
              />
            </div>
          </section>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          placement="center"
          className="bg-primary text-white p-2 rounded-lg mt-20"
        >
          <ModalContent>
            <ModalBody>
              <p className="text-sm text-gray-600">
                Please enter your credentials to log in.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} variant="light" className="text-white">
                Close
              </Button>
              <Button
                onPress={() => alert("Proceeding with login")}
                className="text-white"
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
