import { Suspense } from "react";

import { ArticleLayout } from "@/layouts/article-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { FloatLayout } from "@/layouts/float-layout";
import { SkeletonFloat } from "@/skeleton/skeletion-float";
import { SkeletonArticle } from "@/skeleton/skeleton-article";
import { AccountPage } from "@/module/account/page";
import { SkeletonAccountForm } from "@/skeleton/skeleton-account-form";

export default function Account() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <AccountPage />
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
