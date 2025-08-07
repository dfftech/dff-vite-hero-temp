import { Suspense } from "react";

import { SkeletonLoginForm } from "@/skeleton/skeleton-login-form";
import { LoginPage } from "@/modules/auth/login-page";
import { AuthLayout } from "@/layouts/auth-layout";
import { PageLayout } from "@/layouts/page-layout";

export default function Login() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <LoginPage />
    </Suspense>
  );
}

function SkeletonPage() {
  return (
    <PageLayout>
      <AuthLayout>
        <SkeletonLoginForm />
      </AuthLayout>
    </PageLayout>

  );
}
