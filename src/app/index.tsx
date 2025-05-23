import { Suspense } from "react";

import { HomePage } from "@/module/home/page";
import { ArticleLayout } from "@/layouts/article-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { FloatLayout } from "@/layouts/float-layout";
import { SkeletonTable } from "@/skeleton/skeletion-table";
import { SkeletonFloat } from "@/skeleton/skeletion-float";
import { SkeletonArticle } from "@/skeleton/skeleton-article";

export default function IndexPage() {
  return (
    <Suspense fallback={<SkeletonPage />}>
      <HomePage />
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
