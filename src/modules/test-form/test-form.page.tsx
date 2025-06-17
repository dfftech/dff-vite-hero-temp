import React from "react";
import { useForm } from "react-hook-form";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";
import { useTranslation } from "react-i18next";

import { TestType } from "./common/types";
import { TestValidation } from "./common/validation";

import TypeButton from "@/types/type.button";
import { TypeInput } from "@/types/type.input";
import { ContentLayout } from "@/layouts/content-layout";
import { ArticleLayout } from "@/layouts/article-layout";
import TypeDatePicker from "@/types/type.date";
import { TypeSelect } from "@/types/type.select"; // <-- make sure this path is correct

const isSubmitLoading = signal(false);

export default function TestFormPage() {
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
    const value = data.date;
    const { year, month, day } = value;

    const hour = value.hour ?? 0;
    const minute = value.minute ?? 0;
    const second = value.second ?? 0;
    const millisecond = value.millisecond ?? 0;

    const date = new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      second,
      millisecond
    );
    data.date = date;

    setTest(data);
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

  const ComponentName = () => (
    <TypeInput
      control={control}
      disabled={false}
      error={errors["name"]}
      label={t("name")}
      name={"name"}
      rules={testRule.name}
      value={test.name || ""}
    />
  );

  const ComponentEventDate = () => (
    <TypeDatePicker
      control={control}
      name="date"
      placeholder="Event Date"
      isDateTimeEnabled={true}
      rules={{ required: "Event date is required" }}
      className="w-full"
      value={test.date}
      onChange={(value: any | null) => {
        test.date = value;
      }}
    />
  );

  const ComponentCategory = () => {
    const categoryOptions = [
      { key: "tech", label: "Technology", lang: "en", active: true },
      { key: "sci", label: "Science", lang: "en", active: true },
      { key: "math", label: "Mathematics", lang: "en", active: true },
    ];

    return (
      <TypeSelect
        control={control}
        name="category"
        label="Category"
        value={test.category || []}
        rules={{ required: "Category is required" }}
        error={errors["category"]}
        options={categoryOptions}
        className="w-full"
        multiSelect={true}
        onChange={(val) => {
          test.category = Array.isArray(val) ? val : [val];
        }}
      />
    );
  };

  const ComponentCategorySingle = () => {
    const categoryOptions = [
      { key: "tech", label: "Technology", lang: "en", active: true },
      { key: "sci", label: "Science", lang: "en", active: true },
      { key: "math", label: "Mathematics", lang: "en", active: true },
    ];

    return (
      <TypeSelect
        control={control}
        name="category2"
        label="CategoryWithSingleSelection"
        value={test.category2 || ""}
        rules={{ required: "Category is required" }}
        error={errors["category"]}
        options={categoryOptions}
        className="w-full"
        multiSelect={false}
        onChange={(val) => {
          test.category2 = val.toString();
        }}
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
            {ComponentName()}
            {ComponentEventDate()}
            {ComponentCategory()}
            {ComponentCategorySingle()}
            <div className="flex flex-row gap-4">
              <ComponentSubmit />
              <ComponentCancel />
            </div>
            <div className="flex flex-row gap-4">
              <pre className="text-sm">{JSON.stringify(test, null, 2)}</pre>
            </div>
          </div>
        </form>
      </ContentLayout>
    </>
  );
}
