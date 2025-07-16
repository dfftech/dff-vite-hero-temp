import { useForm } from "react-hook-form";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ConstKeys } from "dff-util";
import { Skeleton } from "@heroui/react";

import { profileInitValues, ProfileType } from "./common/types";
import { profileValidation } from "./common/validation";
import {
  editModeUpdate,
  profileSelectedId,
  profileSaveIsLoading,
  profileEntityCall,
  profileSaveCall,
  profileEntityIsLoading,
} from "./common/service";

import { ArticleLayout } from "@/layouts/article-layout";
import TypeButton from "@/types/type.button";
import { ContentLayout } from "@/layouts/content-layout";
import TypeSwitch from "@/types/type.switch";
import { ShowToast } from "@/utils/services/app.event";

export default function ProfileForm() {
  useSignals();
  const { t } = useTranslation();
  const profile = useSignal<ProfileType>({ ...profileInitValues });
  const profileRule = profileValidation;

  React.useEffect(() => {
    onReloadProfile();
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileType>({});

  const onResetProfile = () => {
    reset({ ...profile.value });
  };

  const onSubmitProfile = async (data: ProfileType) => {
    profile.value = data;
    const resp = await profileSaveCall(profile.value);

    if (resp) {
      ShowToast(t(ConstKeys.SAVED_SUCCESSFULLY), "success");
      editModeUpdate(undefined);
    }
  };

  const onCancelProfile = () => {
    onResetProfile();
    editModeUpdate(undefined);
  };

  const onReloadProfile = async () => {
    if (profileSelectedId.value) {
      const params = {
        id: profileSelectedId.value,
      };
      const resp = await profileEntityCall(params);

      if (resp) {
        profile.value = resp;
        onResetProfile();
      }
    }
  };

  const submitProps = useMemo(
    () => ({
      isLoading: profileSaveIsLoading.value,
      label: t("submit"),
      name: "SendHorizontal" as const,
      onPress: handleSubmit(onSubmitProfile),
    }),
    [t, profileSaveIsLoading.value],
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

  const activeProps = useMemo(
    () => ({
      control,
      label: t("active"),
      name: "active",
      disabled: false,
    }),
    [t],
  );

  return (
    <section className="w-full">
      <ArticleLayout>
        <div className="flex flex-row justify-between gap-4">
          <h3>Profile Form</h3>
          <div className="flex flex-row gap-4">
            <TypeButton {...cancelProps} />
            <TypeButton {...submitProps} />
          </div>
        </div>
      </ArticleLayout>
      <ContentLayout>
        <form>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-4">
              <Skeleton
                className="h-9 rounded-lg"
                isLoaded={!profileEntityIsLoading.value}
              >
                <TypeSwitch {...activeProps} />
              </Skeleton>
              <TypeSwitch {...activeProps} />
            </div>
          </div>
        </form>
      </ContentLayout>
    </section>
  );
}
