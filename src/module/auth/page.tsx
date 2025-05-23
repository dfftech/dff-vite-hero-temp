import { ArticleLayout } from "@/layouts/article-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { FloatLayout } from "@/layouts/float-layout";
import { SkeletonForm } from "@/skeleton/skeleton-form";
import { TypeIcon } from "@/types/type.icon";

export async function HomePage() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const RenderArticle = () => {
    return (
      <aside className="flex gap-2">
        <div>
          <h2 className="text-2xl font-bold">Auth</h2>
        </div>
        <div className="flex gap-2">
          <TypeIcon color="red" name="RotateCcw" size={24} />
          <TypeIcon color="blue" name="RotateCcw" size={24} />
          <TypeIcon color="green" name="RotateCcw" size={24} />
          <TypeIcon color="yellow" name="RotateCcw" size={24} />
        </div>
      </aside>
    );
  };
  const RenderSection = () => {
    return (
      <aside>
        <SkeletonForm />;
      </aside>
    );
  };

  const RenderFloat = () => {
    return <TypeIcon name="RotateCcw" />;
  };

  return (
    <>
      <ArticleLayout>
        <RenderArticle />
      </ArticleLayout>
      <ContentLayout>
        <RenderSection />
      </ContentLayout>
      <FloatLayout>
        <RenderFloat />
      </FloatLayout>
    </>
  );
}
