import { useSignals } from "@preact/signals-react/runtime";

import { ProfilesGrid } from "./profile.grid";

export function ProfilesPage() {
  useSignals();

  return (
    <>
      <ProfilesGrid />
    </>
  );
}
