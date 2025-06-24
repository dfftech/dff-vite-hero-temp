import { Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import { useSignals } from "@preact/signals-react/runtime";

import { ProfileList } from "./profile.list";
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
      <ProfileList />
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
