import { Suspense } from "react";

import { ArticleLayout } from "@/layouts/article-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { FloatLayout } from "@/layouts/float-layout";
import { SkeletonFloat } from "@/skeleton/skeleton-float";
import { SkeletonArticle } from "@/skeleton/skeleton-article";
import { SkeletonAccountForm } from "@/skeleton/skeleton-account-form";
import { ProfilesPage } from "@/modules/profiles/page";

export default function Profile() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <ProfilesPage />
    </Suspense>
  );
}

function SkeletonPage() {
  return (
    <>
      <ArticleLayout>
        <SkeletonArticle />
      </ArticleLayout>
      <ContentLayout>
        <SkeletonAccountForm />
      </ContentLayout>
      <FloatLayout>
        <SkeletonFloat />
      </FloatLayout>
    </>
  );
}
