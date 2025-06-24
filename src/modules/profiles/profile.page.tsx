import { Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import { useSignals } from "@preact/signals-react/runtime";

import { ProfilesGrid } from "./profile.grid";
import {
  profileIsPopupOpen,
  profileIsEditMode,
  editModeUpdate,
} from "./common/service";
import ProfileView from "./profile.view";
import ProfileForm from "./profile.form";

export function ProfilesPage() {
  useSignals();

  return (
    <>
      <ProfilesGrid />
      <Drawer
        hideCloseButton
        isOpen={profileIsPopupOpen.value}
        size="4xl"
        onClose={() => editModeUpdate(undefined)}
      >
        <DrawerContent>
          <DrawerBody className="w-full">
            {profileIsEditMode.value ? <ProfileForm /> : <ProfileView />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
