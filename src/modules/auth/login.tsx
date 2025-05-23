import { ContentLayout } from "@/layouts/content-layout";
import { SkeletonForm } from "@/skeleton/skeleton-form";
import { SkeletonLoginForm } from "@/skeleton/skeleton-login-form";

export async function LoginPage() {
  const RenderSection = () => {
    return (
      <aside>
        <SkeletonLoginForm />;
      </aside>
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
