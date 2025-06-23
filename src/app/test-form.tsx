import { Suspense } from "react";

import { ArticleLayout } from "@/layouts/article-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { FloatLayout } from "@/layouts/float-layout";
import TestPage from "@/modules/test-form/test.page";
import { SkeletonFloat } from "@/skeleton/skeleton-float";
import { SkeletonArticle } from "@/skeleton/skeleton-article";
import { SkeletonTable } from "@/skeleton/skeleton-table";

export default function TestForm() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <TestPage />
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
        <SkeletonTable />
      </ContentLayout>
      <FloatLayout>
        <SkeletonFloat />
      </FloatLayout>
    </>
  );
}
