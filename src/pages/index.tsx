import { SkeletonListComponent } from "../skeleton/skeleton-list";
import DefaultLayout from "../layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <SkeletonListComponent />
    </DefaultLayout>
  );
}
