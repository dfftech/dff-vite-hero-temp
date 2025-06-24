import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  editModeUpdate,
  profileSelectedId,
  profileEntityCall,
} from "./common/service";
import { ProfileType, profileInitValues } from "./common/types";

import TypeButton from "@/types/type.button";
import { ContentLayout } from "@/layouts/content-layout";
import { ArticleLayout } from "@/layouts/article-layout";
import { ScreenAccess } from "@/utils/services/app.event";

export default function ProfileView() {
  useSignals();
  const { t } = useTranslation();
  const profile = useSignal<ProfileType>({ ...profileInitValues });

  React.useEffect(() => {
    onReloadProfile();
  }, []);

  const onCancelProfile = () => {
    editModeUpdate(undefined);
  };

  const editActionProfile = () => {
    editModeUpdate(profileSelectedId.value, "edit");
  };

  const onReloadProfile = async () => {
    if (profileSelectedId.value) {
      const params = {
        id: profileSelectedId.value,
      };
      const resp = await profileEntityCall(params);

      if (resp) {
        profile.value = resp;
      }
    }
  };

  const editActionProps = useMemo(
    () => ({
      action: "primary" as const,
      label: t("edit"),
      name: "Pencil" as const,
      onPress: editActionProfile,
      disabled: !ScreenAccess.value.update,
    }),
    [t],
  );

  const cancelProps = useMemo(
    () => ({
      action: "secondary" as const,
      label: t("cancel"),
      name: "CircleX" as const,
      onPress: onCancelProfile,
    }),
    [t],
  );

  return (
    <section className="w-full">
      <ArticleLayout>
        <div className="flex flex-row justify-between gap-4">
          <h3>Profile View</h3>
          <div className="flex flex-row gap-4">
            <TypeButton {...cancelProps} />
            {ScreenAccess.value.update && <TypeButton {...editActionProps} />}
          </div>
        </div>
      </ArticleLayout>
      <ContentLayout>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            {profile.value.active ? t("active") : t("inActive")}
          </div>
        </div>
      </ContentLayout>
    </section>
  );
}
