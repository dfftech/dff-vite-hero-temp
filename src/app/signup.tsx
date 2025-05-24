import { Suspense } from "react";

import { SkeletonLoginForm } from "@/skeleton/skeleton-login-form";
import { SignUpPage } from "@/modules/auth/signup";

export default function SignUp() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <SignUpPage />
    </Suspense>
  );
}

function SkeletonPage() {
  return (
    <>
      <SkeletonLoginForm />
    </>
  );
}
