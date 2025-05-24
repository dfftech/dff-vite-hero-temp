import { Suspense } from "react";
import { SkeletonLoginForm } from "@/skeleton/skeleton-login-form";
import { ForgotPage } from "@/modules/auth/forgot";

export default function Forgot() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <ForgotPage />
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
