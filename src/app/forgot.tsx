import { Suspense } from "react";
import { SkeletonLoginForm } from "@/skeleton/skeleton-login-form";
import ForgotPage from "@/modules/auth/forgot";
import { AuthLayout } from "@/layouts/auth-layout";


export default function Forgot() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <ForgotPage />
    </Suspense>
  );
}

function SkeletonPage() {
  return (
    <AuthLayout>
      <SkeletonLoginForm />
    </AuthLayout>
  );
}
