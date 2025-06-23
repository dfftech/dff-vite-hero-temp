import React, { useMemo } from "react";
import { Path, useForm } from "react-hook-form";
import { useSignals } from "@preact/signals-react/runtime";
import { signal, useSignal } from "@preact/signals-react";
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";

import { TestType } from "./common/types";
import { TestValidation } from "./common/validation";
import {
  testDefaultValue,
  testDataValue,
  countryOptions,
  countryLoadCall,
  drawerOpen,
} from "./common/service";

import TypeButton from "@/types/type.button";
import TypeInput from "@/types/type.input";
import { ContentLayout } from "@/layouts/content-layout";
import { ArticleLayout } from "@/layouts/article-layout";
import TypeDate from "@/types/type.date";
import TypeLang from "@/types/type.lang";
import TypeSelect from "@/types/type.select";
import TypeCheck from "@/types/type.check";
import TypeSwitch from "@/types/type.switch";
import TypeList from "@/types/type.list";
import TypeOtp from "@/types/type.otp";
import TypeTime from "@/types/type.time";
import TypeLangMd from "@/types/type.lang-md";
import TypeSearch from "@/types/type.search";
import TypeMdxEditor from "@/types/type.mdx";
import MarkdownViewer from "@/types/type.mdv";

const isSubmitLoading = signal(false);

export default function TestForm() {
  useSignals();
  const { t } = useTranslation();

  React.useEffect(() => {
    countryLoadCall("load-country");
    test.value = testDefaultValue;
    onResetTest();
  }, []);

  const testRule = TestValidation;
  const test = useSignal<TestType>({ ...testDefaultValue });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TestType>({});

  const onResetTest = () => {
    reset({ ...test.value });
  };

  const onSubmitTest = async (data: TestType) => {
    test.value = data;
  };

  const onCancel = () => {
    onResetTest();
    drawerOpen.value = false;
  };

  const [isToggleOn, setIsToggleOn] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  const changeDataLoad = (checked: boolean) => {
    setIsToggleOn(checked);
    if (checked) {
      test.value = { ...testDataValue };
      reset({ ...testDataValue });
    } else {
      test.value = { ...testDefaultValue };
      reset({ ...testDefaultValue } as TestType);
    }
  };

  const mdxProps = useMemo(
    () => ({
      control: control,
      error: errors["mdxWithoutLang"],
      label: t("mdxWithoutLang"),
      name: "mdxWithoutLang" as const,
      value: test.value.mdxWithoutLang,
      rules: testRule?.mdx,
    }),
    [t, errors.mdxWithoutLang]
  );

  const submitProps = useMemo(
    () => ({
      isLoading: isSubmitLoading.value,
      label: t("submit"),
      name: "SendHorizontal" as const,
      onPress: handleSubmit(onSubmitTest),
    }),
    [t]
  );

  const cancelProps = useMemo(
    () => ({
      action: "secondary" as const,
      isLoading: isSubmitLoading.value,
      label: t("cancel"),
      name: "CircleX" as const,
      onPress: onCancel,
    }),
    [t]
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
    [t, errors.name]
  );

  const otpProps = useMemo(
    () => ({
      control: control,
      disabled: false,
      error: errors.otp,
      label: t("otp"),
      name: "otp",
      rules: testRule?.otp,
      length: 6,
    }),
    [t, errors.otp]
  );

  const eventDateProps = useMemo(
    () => ({
      className: "w-full",
      control: control,
      error: errors["eventDate"],
      isDateTimeEnabled: true,
      label: t("eventDate"),
      name: "eventDate",
      rules: testRule?.eventDate,
    }),
    [t, errors.eventDate]
  );

  const termsAcceptedProps = useMemo(
    () => ({
      control: control,
      label: t("termAccepted"),
      name: "termsAccepted",
    }),
    [t]
  );

  const listCountryProps = useMemo(
    () => ({
      control: control,
      label: t("countries"),
      name: "countries",
      options: countryOptions.value,
      rules: testRule?.countries,
      disabled: false,
      selectionMode: "multiple" as const,
    }),
    [t, countryOptions.value]
  );

  const langProps = useMemo(
    () => ({
      control: control,
      disabled: false,
      error: errors["lang"],
      label: t("lang"),
      name: "lang",
      rules: { required: true },
      type: "text" as const,
    }),
    [t, errors.lang]
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
    [t, errors.country, countryOptions.value]
  );

  const timeProps = useMemo(
    () => ({
      control: control,
      disabled: false,
      error: errors.time,
      label: t("time"),
      name: "time",
      rules: testRule?.time,
      type: 12 as const,
    }),
    [t, errors.time],
  );

  const mdProps = useMemo(
    () => ({
      control: control,
      disabled: false,
      error: errors.md,
      label: t("md"),
      name: "md",
      rules: testRule.md,
    }),
    [t, errors.md],
  );

  const mdvProps = useMemo(
    () => ({
      markdownText: test.value.mdv,
      className: "w-full h-[250px]",
    }),
    [test.value.mdv],
  );

  const searchProps = useMemo(
    () => ({
      disabled: false,
      label: t("search"),
      name: "search",
      value: "",
      onChange: (value: string) => {
        setSearchTerm(value);
      },
    }),
    [t]
  );

  return (
    <section className="w-full">
      <ArticleLayout>
        <div className="flex flex-row justify-between gap-4">
          <h3>Test Form</h3>
          <div className="flex flex-row gap-4">
            <Switch
              checked={isToggleOn}
              onValueChange={(checked) => changeDataLoad(checked)}
            >
              With Data
            </Switch>
            <TypeButton {...cancelProps} />
            <TypeButton {...submitProps} />
          </div>
        </div>
      </ArticleLayout>
      <ContentLayout>
        <form>
          <div className="flex flex-col justify-between md:flex-row gap-4 w-full">
            <div className="flex flex-col gap-4">
              <TypeInput {...nameProps} />
              <TypeOtp {...otpProps} />
              <TypeCheck {...termsAcceptedProps} />
              <TypeSwitch {...termsAcceptedProps} />
              <TypeDate {...eventDateProps} />
              <TypeTime {...timeProps} />
              <TypeSelect {...countryProps} />
              <TypeList {...listCountryProps} />
              <TypeLang {...langProps} />
              <TypeLangMd {...mdProps} />
              <TypeSearch {...searchProps} />
              <TypeMdxEditor {...mdxProps} />
              <MarkdownViewer {...mdvProps} />

              <sub>{searchTerm}</sub>
              <br />
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
