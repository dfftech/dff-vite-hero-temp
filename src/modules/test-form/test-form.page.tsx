import React from "react";
import { useForm } from "react-hook-form";
import { useSignals } from "@preact/signals-react/runtime";
import { signal } from "@preact/signals-react";
import { useTranslation } from "react-i18next";
import { OptionType } from "dff-util";

import { TestType } from "./common/types";
import { TestValidation } from "./common/validation";
import { DefaultTest, LoadedTest, onCountryLoad } from "./common/service";

import TypeButton from "@/types/type.button";
import { TypeInput } from "@/types/type.input";
import { ContentLayout } from "@/layouts/content-layout";
import { ArticleLayout } from "@/layouts/article-layout";
import TypeDatePicker from "@/types/type.date";
import TypeLang from "@/types/type.lang";
import { TypeSelect } from "@/types/type.select";

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
  };

  const onResetTest = () => {
    reset({ ...test });
  };

  const onSubmitTest = async (data: TestType) => {
    setTest(data);
  };

  const onCancel = () => {
    onResetTest();
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
    />
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

  const ComponentLang = () => (
    <TypeLang
      control={control}
      error={errors["lang"]}
      label="Lang"
      name={"lang"}
      rules={{ required: true }}
      type="textarea"
    />
  );

  const ComponentCountry = () => {
    const [countryList, setCountryList] = React.useState<OptionType[]>([]);
    const countryLoad = async () => {
      const resp = await onCountryLoad(`\loadcountry`);

      setCountryList(resp || []);
    };

    React.useEffect(() => {
      countryLoad();
    }, []);

    return (
      <TypeSelect
        control={control}
        disabled={false}
        error={errors["country"]}
        label={t("country")}
        multiSelect={false}
        name={"country"}
        options={countryList}
        rules={testRule.country}
      />
    );
  };


  const ComponentCountries = () => {
    const [countryList, setCountryList] = React.useState<OptionType[]>([]);
    const countryLoad = async () => {
      const resp = await onCountryLoad(`\loadcountry`);

      setCountryList(resp || []);
    };

    React.useEffect(() => {
      countryLoad();
    }, []);

    return (
      <TypeSelect
        control={control}
        disabled={false}
        error={errors["countries"]}
        label={t("countries")}
        multiSelect={true}
        name={"countries"}
        options={countryList}
        rules={testRule.country}
      />
    );
  };

  return (
    <section className="w-full">
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
          <div className="flex flex-col justify-between md:flex-row gap-4 w-full">
            <div className="flex flex-col gap-4">
              {ComponentName()}
              {ComponentEventDate()}
              {ComponentCountry()}
              {ComponentCountries()}
              {ComponentLang()}
            </div>
            <div className="flex flex-row gap-4">
              <pre className="text-sm">{JSON.stringify(test, null, 2)}</pre>
            </div>
          </div>
        </form>
      </ContentLayout>
    </section>
  );
}
