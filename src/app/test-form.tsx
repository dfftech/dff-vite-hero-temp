import React from "react";
import { useForm } from "react-hook-form";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";
import { useTranslation } from "react-i18next";

import TypeButton from "@/types/type.button";
import { TypeInput } from "@/types/type.input";
import DefaultLayout from "@/layouts/default-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { ArticleLayout } from "@/layouts/article-layout";

const TestValidation = {
  name: {
    required: {
      value: true,
      message: "Name is required",
    },
    minLength: {
      value: 3,
      message: "Name must be at least 3 characters",
    },
    maxLength: {
      value: 100,
      message: "Name must be at most 100 characters",
    },
  },
};

type TestType = {
  name: string;
};

const isSubmitLoading = signal(false);

export default function TestForm() {
  const { t } = useTranslation();

  useSignals();
  const testRule = TestValidation;
  const [test, setTest] = React.useState<TestType>({} as TestType);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TestType>({});

  React.useEffect(() => {
    onDefaultTest();
    onResetTest();
  }, []);
  const onDefaultTest = () => {
    setTest({} as TestType);
  };
  const onResetTest = () => {
    reset({ ...test });
  };
  const onSubmitTest = async (data: TestType) => {
    console.log("data test : ", data);
  };
  const onCancel = () => {
    console.log("cancel");
  };
  const ComponentSubmit = () => (
    <TypeButton
      isLoading={isSubmitLoading.value}
      label="Submit"
      name="SendHorizontal"
      onPress={handleSubmit(onSubmitTest)}
    />
  );
  const ComponentCancel = () => (
    <TypeButton
      action="secondary"
      label="Cancel"
      name="CircleX"
      onPress={onCancel}
    />
  );

  const ComponentName = () => {
    return (
      <TypeInput
        control={control}
        disabled={false}
        error={errors}
        label={t("name")}
        name={"test.name"}
        rules={testRule.name}
        value={test.name || ""}
      />
    );
  };

  return (
    <>
      <ArticleLayout>
        <h3>Test Form</h3>
      </ArticleLayout>
      <ContentLayout>
        <form>
          <div className="flex flex-col gap-4">
            <ComponentName />
            <div className="flex flex-row gap-4">
              <ComponentSubmit />
              <ComponentCancel />
            </div>
          </div>
        </form>
      </ContentLayout>
    </>
  );
}
