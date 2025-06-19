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
import { DefaultTest, LoadedTest } from "./common/service";

const isSubmitLoading = signal(false);

export default function TestFormPage() {
  const { t } = useTranslation();

  useSignals();
  const testRule = TestValidation;
  const [test, setTest] = React.useState<TestType>({} as TestType);

  const [isToggleOn, setIsToggleOn] = React.useState(false);

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
    console.log("test : ", test);
  };

  const onResetTest = () => {
    reset({ ...test });
  };

  const onSubmitTest = async (data: TestType) => {
    data.eventDate = (data.eventDate as any).toDate();
    console.log("data : ", data);
    setTest(data);
    console.log("data test : ", data);
    console.log("test : ", test);
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
        value={
          typeof test.category === "string"
            ? test.category.split(",")
            : (test.category as string[]) || []
        }
        multiSelect={true}
        onChange={(val) => {
          test.category = val;
        }}
      />
      //   <TypeSelect
      //   className="w-full"
      //   control={control}
      //   name="performers"
      //   multiSelect={true}
      //   value={
      //     typeof SelectedPoojaService.value?.performers ===
      //     "string"
      //       ? SelectedPoojaService.value.performers.split(",")
      //       : (SelectedPoojaService.value
      //           ?.performers as string[]) || []
      //   }
      //   options={PerformersList.value?.map(
      //     (v: PerformersType) => ({
      //       label: v.name,
      //       key: v._id,
      //       // active: true,
      //       didable: false,
      //     })
      //   )}
      //   error={errors.performers}
      // />
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
        value={test.category2}
        multiSelect={false}
        onChange={(val) => {
          console.log("val : ", val);
          test.category2 = val;
        }}
      />

      //   <TypeSelect
      //   className="w-full"
      //   control={control}
      //   name="performers"
      //   multiSelect={true}
      //   value={
      //     typeof SelectedPoojaService.value?.performers ===
      //     "string"
      //       ? SelectedPoojaService.value.performers.split(",")
      //       : (SelectedPoojaService.value
      //           ?.performers as string[]) || []
      //   }
      //   options={PerformersList.value?.map(
      //     (v: PerformersType) => ({
      //       label: v.name,
      //       key: v._id,
      //       // active: true,
      //       didable: false,
      //     })
      //   )}
      //   error={errors.performers}
      // />
    );
  };

  const ComponentToggle = () => (
    <div className="flex items-center gap-2">
      <label htmlFor="toggleDefault">Use Default</label>
      <input
        id="toggleDefault"
        type="checkbox"
        checked={isToggleOn}
        onChange={(e) => {
          const checked = e.target.checked;
          setIsToggleOn(checked);
          if (checked) {
            setTest({ ...LoadedTest });
            reset({ ...LoadedTest });
          } else {
            setTest({ ...DefaultTest });
            reset({ ...DefaultTest });
          }
        }}
      />
    </div>
  );

  return (
    <>
      <ArticleLayout>
        <div className="flex flex-row justify-between gap-4">
          <h3>Test Form</h3>
          <div className="flex flex-row gap-4">
            <ComponentToggle />
            <ComponentSubmit />
            <ComponentCancel />
          </div>
        </div>
      </ArticleLayout>
      <ContentLayout>
        <form>
          <div className="flex flex-col justify-between md:flex-row gap-10">
            <div className="flex flex-col gap-4">
              {ComponentName()}
              {ComponentEventDate()}
              {ComponentCategory()}
              {ComponentCategorySingle()}
              <TypeInputLang
                control={control}
                label="Lang"
                name={"lang"}
                rules={{ required: true }}
                value={test.lang}
                onChange={(values) => console.log(values)}
              />
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
