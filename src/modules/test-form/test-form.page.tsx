import React from "react";
import { useForm } from "react-hook-form";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";
import { useTranslation } from "react-i18next";
import { OptionType } from "dff-util";

import { TestType } from "./common/types";
import { TestValidation } from "./common/validation";

import TypeButton from "@/types/type.button";
import { TypeInput } from "@/types/type.input";
import { ContentLayout } from "@/layouts/content-layout";
import { ArticleLayout } from "@/layouts/article-layout";
import TypeDatePicker from "@/types/type.date";
import { TypeSelect } from "@/types/type.select"; // <-- make sure this path is correct
import TypeInputLang from "@/types/type.inputlang";

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
    data.eventDate = (data.eventDate as any).toDate();
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
      className="w-full"
      control={control}
      error={errors["eventDate"]}
      isDateTimeEnabled={true}
      label="Event Date"
      name="eventDate"
      rules={{ required: "Event date is required" }}
      value={test.eventDate}
    />
  );

  const ComponentCategory = () => {
    const categoryOptions: OptionType[] = [
      { label: "Technology", key: "tech", disabled: false },
      { label: "Science", key: "sci", disabled: false },
      { label: "Mathematics", key: "math", disabled: false },
    ];

    return (
      <TypeSelect
        className="w-full"
        control={control}
        error={errors["category"]}
        label="Category"
        name="category"
        options={categoryOptions}
        rules={{ required: "Category is required" }}
        value={test.category || []}
        multiSelect={true}
      // onChange={(val) => {
      //   test.category = Array.isArray(val) ? val : [val];
      // }}
      />
    );
  };

  const ComponentCategorySingle = () => {
    const categoryOptions: OptionType[] = [
      { label: "Technology", key: "tech", disabled: false },
      { label: "Science", key: "sci", disabled: false },
      { label: "Mathematics", key: "math", disabled: false },
    ];

    return (
      <TypeSelect
        className="w-full"
        control={control}
        error={errors["category"]}
        label="CategoryWithSingleSelection"
        name="category2"
        options={categoryOptions}
        rules={{ required: "Category is required" }}
        value={test.category2 || ""}
        multiSelect={false}
      // onChange={(val) => {
      //   test.category2 = val.toString();
      // }}
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
            <TypeInputLang
              control={control}
              label="Country Name"
              name="countryName"
              rules={{ required: true }}
              value={test.lang}
              onChange={(values) => console.log(values)}
            />
            <div className="flex flex-row gap-4">
              <ComponentSubmit />
              <ComponentCancel />
            </div>
            <div className="flex flex-row gap-4">
              <pre className="text-sm">{JSON.stringify(test, null, 2)}</pre>
              <pre className="text-sm">
                {new Date(
                  test.eventDate || new Date().toISOString(),
                )?.toLocaleString()}
              </pre>
            </div>
          </div>
        </form>
      </ContentLayout>
    </>
  );
}
