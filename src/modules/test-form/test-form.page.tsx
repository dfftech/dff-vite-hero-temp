import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSignals } from "@preact/signals-react/runtime";
import { signal, useSignal } from "@preact/signals-react";
import { useTranslation } from "react-i18next";

import { TestType } from "./common/types";
import { TestValidation } from "./common/validation";
import {
  testDefaultValue,
  testDataValue,
  countryOptions,
  countryLoadCall,
} from "./common/service";

import TypeButton from "@/types/type.button";
import { TypeInput } from "@/types/type.input";
import { ContentLayout } from "@/layouts/content-layout";
import { ArticleLayout } from "@/layouts/article-layout";
import TypeDatePicker from "@/types/type.date";
import TypeLang from "@/types/type.lang";
import { TypeSelect } from "@/types/type.select";
import { TypeCheck } from "@/types/type.check";
import { TypeSwitch } from "@/types/type.switch";
import { TypeList } from "@/types/type.list";

const isSubmitLoading = signal(false);

export default function TestFormPage() {
  const { t } = useTranslation();

  useSignals();
  const testRule = TestValidation;
  const test = useSignal<TestType>({ ...testDefaultValue });

  const [isToggleOn, setIsToggleOn] = React.useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TestType>({});

  React.useEffect(() => {
    countryLoadCall("load-country");
    test.value = testDefaultValue;
    onResetTest();
  }, []);

  const onResetTest = () => {
    reset({ ...test.value });
  };

  const onSubmitTest = async (data: TestType) => {
    test.value = data;
  };

  const onCancel = () => {
    onResetTest();
  };

  const submitProps = useMemo(
    () => ({
      isLoading: isSubmitLoading.value,
      label: "Submit",
      name: "SendHorizontal" as const,
      onPress: handleSubmit(onSubmitTest),
    }),
    [],
  );

  const cancelProps = useMemo(
    () => ({
      isLoading: isSubmitLoading.value,
      label: "Cancel",
      name: "CircleX" as const,
      onPress: onCancel,
    }),
    [],
  );

  const nameProps = useMemo(
    () => ({
      control: control,
      disabled: false,
      error: errors.name,
      label: t("name"),
      multiSelect: false,
      name: "name",
      rules: testRule?.name,
    }),
    [errors.name],
  );

  const eventDateProps = useMemo(
    () => ({
      className: "w-full",
      control: control,
      error: errors["eventDate"],
      isDateTimeEnabled: true,
      label: "Event Date",
      name: "eventDate",
      rules: { required: "Event date is required" },
    }),
    [errors.eventDate],
  );

  const termsAcceptedProps = useMemo(
    () => ({
      control: control,
      label: "Terms Accepted",
      name: "termsAccepted",
    }),
    [],
  );

  const listCountryProps = useMemo(
    () => ({
      control: control,
      label: "Countries",
      name: "countries",
      options: countryOptions.value,
      rules: testRule?.countries,
      selectionMode: "multiple" as const,
    }),
    [countryOptions.value],
  );


  const ComponentToggle = () => (
    <div className="flex items-center gap-2">
      <label htmlFor="toggleDefault">Use Default</label>
      <input
        checked={isToggleOn}
        id="toggleDefault"
        type="checkbox"
        onChange={(e) => {
          const checked = e.target.checked;

          setIsToggleOn(checked);
          if (checked) {
            test.value = testDataValue;
            reset({ ...testDataValue });
          } else {
            test.value = testDefaultValue;
            reset({ ...testDefaultValue } as TestType);
          }
        }}
      />
    </div>
  );

  const langProps = useMemo(
    () => ({
      control: control,
      disabled: false,
      error: errors["lang"],
      label: "Lang",
      name: "lang",
      rules: { required: true },
      type: "text" as const,
    }),
    [errors.lang],
  );

  const countryProps = useMemo(
    () => ({
      control: control,
      disabled: false,
      error: errors.country,
      label: t("country"),
      multiSelect: false,
      name: "country",
      options: countryOptions.value,
      rules: testRule?.country,
    }),
    [errors.country, countryOptions.value],
  );

  return (
    <section className="w-full overflow-y-auto mb-8">
      <ArticleLayout>
        <div className="flex flex-row justify-between gap-4">
          <h3>Test Form</h3>
          <div className="flex flex-row gap-4">
            <ComponentToggle />
            <TypeButton {...submitProps} />
            <TypeButton {...cancelProps} />
          </div>
        </div>
      </ArticleLayout>
      <ContentLayout>
        <form>
          <div className="flex flex-col justify-between md:flex-row gap-4 w-full">
            <div className="flex flex-col gap-4">
              <TypeInput {...nameProps} />
              <TypeCheck {...termsAcceptedProps} />
              <TypeSwitch {...termsAcceptedProps} />
              <TypeDatePicker {...eventDateProps} />
              <TypeSelect {...countryProps} />
              <TypeList {...listCountryProps} />
              <TypeLang {...langProps} />
            </div>
            <div className="flex flex-row gap-4">
              <pre className="text-sm">
                {JSON.stringify(test.value, null, 2)}
              </pre>
            </div>
          </div>
        </form>
      </ContentLayout>
    </section>
  );
}
