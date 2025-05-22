import { SkeletonListArticle } from "./skeleton-list-article";
import { SkeletonTable } from "./skeletion-table";
import { SkeletonFloat } from "./skeletion-float";

import { ArticleLayout } from "@/layouts/article-layout";
import { ContentLayout } from "@/layouts/content-layout";

export const SkeletonListComponent = () => {
  const RenderArticle = () => {
    return <SkeletonListArticle />;
  };
  const RenderSection = () => {
    return <SkeletonTable />;
  };

  const RenderFloat = () => {
    return <SkeletonFloat />;
  };

  return (
    <>
      <ArticleLayout>
        <RenderArticle />
      </ArticleLayout>
      <ContentLayout>
        <RenderSection />
      </ContentLayout>
      <RenderFloat />
    </>
  );
};
