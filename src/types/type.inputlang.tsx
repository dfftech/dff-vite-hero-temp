import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Input } from "@heroui/react";
import { useSignals } from "@preact/signals-react/runtime";
import { LangText } from "dff-util";

import { TypeIcon } from "./type.icon";

import {
  SupportedLanguagesType,
  TranslationType,
} from "@/utils/services/app.types";
import { SessionLang } from "@/utils/services/app.event";
import { languages } from "@/i18n";
import { t } from "@/i18n";

// Placeholder for CallLangText - replace with actual import from dff-utils
type TypeInputLangProps = {
  control: any;
  name: string;
  label?: string | undefined | null;
  value?: TranslationType | {};
  rules?: any;
  error?: any;
  className?: string;
  disabled?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg" | undefined;
  onChange?: (value: TranslationType) => void;
};

export const TypeInputLang = ({
  control,
  name,
  label,
  value,
  rules = {},
  error,
  className = "flex flex-col w-full",
  disabled = false,
  radius = "full",
  onChange,
}: TypeInputLangProps) => {
  useSignals();

  const [langValues, setLangValues] = useState<TranslationType>(
    (value as TranslationType) || {}
  );
  const [translatingLang, setTranslatingLang] =
    useState<SupportedLanguagesType | null>(null);

  const currentLang = SessionLang.value as SupportedLanguagesType;
  const supportedLanguages: SupportedLanguagesType[] = languages.map(
    (lang) => lang.code
  );

  useEffect(() => {
    const initialValues = supportedLanguages.reduce(
      (acc, lang) => ({
        ...acc,
        [lang]: "",
      }),
      {} as TranslationType
    );
    console.log("initialValues ::", initialValues, value);

    if (!value) {
      setLangValues(initialValues as TranslationType);
      console.log("initialValues ::", initialValues);
    } else {
      setLangValues(value as TranslationType);
    }
  }, [value]);

  const handleTranslate = async (targetLang: SupportedLanguagesType) => {
    const sourceText = langValues[currentLang] || "";

    if (!sourceText.trim()) return;

    setTranslatingLang(targetLang);
    try {
      const translatedText = await LangText(
        sourceText,
        currentLang,
        targetLang
      );
      const newValues = {
        ...langValues,
        [targetLang]: translatedText,
      };

      setLangValues(newValues);
      if (onChange) onChange(newValues);

      // Update the form field value
      if (control._formValues) {
        control._formValues[name][targetLang] = translatedText;
      }
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setTranslatingLang(null);
    }
  };

  const handleInputChange = (
    lang: SupportedLanguagesType,
    newValue: string,
    field?: any
  ) => {
    const newValues = {
      ...langValues,
      [lang]: newValue,
    };

    setLangValues(newValues);
    if (onChange) onChange(newValues);
    if (field) field.onChange(newValue);
  };

  const getLanguageName = (code: SupportedLanguagesType) => {
    return languages.find((lang) => lang.code === code)?.locale || code;
  };

  const otherLanguages = supportedLanguages.filter(
    (lang) => lang !== currentLang
  );

  return (
    <section className={className}>
      {label && (
        <label className="text-sm font-medium p-2">
          {label} {rules.required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Primary input for current session language */}
      <div
        style={{
          height: 250,
          overflow: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-600">
              {getLanguageName(currentLang)}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={langValues[currentLang] || ""}
            name={`${name}.${currentLang}`}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full"
                disabled={disabled}
                radius={radius}
                value={langValues[currentLang] || ""}
                onChange={(e) => {
                  const newValue = e.target.value;

                  handleInputChange(currentLang, newValue, field);
                }}
              />
            )}
            rules={rules}
          />
        </div>

        {/* Additional language inputs with translation icons */}
        {otherLanguages.map((lang) => (
          <div key={lang} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-600">
                {getLanguageName(lang)}
              </span>
              <TypeIcon
                name="Languages"
                size={16}
                onClick={() => handleTranslate(lang)}
              />
              {translatingLang === lang && (
                <span className="text-xs text-blue-500">Translating...</span>
              )}
            </div>
            <Controller
              control={control}
              defaultValue={langValues[lang] || ""}
              name={`${name}.${lang}`}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-full"
                  disabled={disabled || translatingLang === lang}
                  radius={radius}
                  value={langValues[lang] || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    handleInputChange(lang, newValue, field);
                  }}
                />
              )}
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{t(error.message)}</p>}
    </section>
  );
};

export default TypeInputLang;
