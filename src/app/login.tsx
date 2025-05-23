import { Suspense } from "react";

import { SkeletonLoginForm } from "@/skeleton/skeleton-login-form";
import { LoginPage } from "@/modules/auth/login";

export default function Login() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <LoginPage />
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
