import { useState } from "react";
import { Controller } from "react-hook-form";
import { Input, Textarea } from "@heroui/react";
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

export type LangTypeProps = "text" | "textarea";

type TypeInputLangProps = {
  control: any;
  name: string;
  label?: string;
  rules?: any;
  error?: any;
  className?: string;
  disabled?: boolean;
  radius?: "full" | "none" | "sm" | "md" | "lg";
  type?: "text" | "textarea";
  onChange?: (value: TranslationType) => void;
};

export const TypeLang = ({
  control,
  name,
  label,
  rules = {},
  error,
  className = "flex flex-col w-full",
  disabled = false,
  radius = "full",
  type = "text",
  onChange,
}: TypeInputLangProps) => {
  useSignals(); // React to SessionLang signal changes

  const [langValues, setLangValues] = useState<TranslationType>({} as any);
  const [translatingLang, setTranslatingLang] =
    useState<SupportedLanguagesType | null>(null);

  const currentLang = SessionLang.value; // Reactive signal
  const supportedLanguages: SupportedLanguagesType[] = languages.map(
    (lang) => lang.code,
  );

  const getLanguageName = (code: SupportedLanguagesType) =>
    languages.find((lang) => lang.code === code)?.locale || code;

  const otherLanguages = supportedLanguages.filter(
    (lang) => lang !== currentLang,
  );

  const getLangValue = (lang: SupportedLanguagesType) =>
    control?._formValues?.[name]?.[lang] ?? langValues?.[lang] ?? "";

  const handleTranslate = async (
    targetLang: SupportedLanguagesType,
    currentValue: string,
    updateField: (value: string) => void,
  ) => {
    if (!currentValue.trim()) return;

    setTranslatingLang(targetLang);
    try {
      const translatedText = await LangText(
        currentValue,
        currentLang,
        targetLang,
      );

      setLangValues((prev) => ({
        ...prev,
        [targetLang]: translatedText,
      }));

      updateField(translatedText);
      onChange?.({
        ...langValues,
        [targetLang]: translatedText,
      });
    } finally {
      setTranslatingLang(null);
    }
  };

  return (
    <section className={className}>
      {label && (
        <label className="text-sm font-medium p-2">
          {label} {rules.required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        style={{
          height: type === "textarea" ? 500 : 250,
          overflow: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        {/* Current Language Input */}
        <div className="mb-4">
          <div className="flex items-center gap-2 p-2">
            <span className="text-xs">
              {getLanguageName(currentLang as any)}
            </span>
          </div>
          <Controller
            key={`lang-${currentLang}`} // 🔥 Force re-render on lang change
            control={control}
            name={`${name}.${currentLang}`}
            render={({ field }) =>
              type === "textarea" ? (
                <Textarea
                  {...field}
                  className="w-full"
                  disabled={disabled}
                  radius={radius}
                  value={field.value ?? getLangValue(currentLang as any)}
                  onChange={(e) => {
                    const newValue = e.target.value;

                    field.onChange(newValue);
                    setLangValues((prev) => ({
                      ...prev,
                      [currentLang]: newValue,
                    }));
                    onChange?.({
                      ...langValues,
                      [currentLang]: newValue,
                    });
                  }}
                />
              ) : (
                <Input
                  {...field}
                  className="w-full"
                  disabled={disabled}
                  radius={radius}
                  value={field.value ?? getLangValue(currentLang as any)}
                  onChange={(e) => {
                    const newValue = e.target.value;

                    field.onChange(newValue);
                    setLangValues((prev) => ({
                      ...prev,
                      [currentLang]: newValue,
                    }));
                    onChange?.({
                      ...langValues,
                      [currentLang]: newValue,
                    });
                  }}
                />
              )
            }
            rules={rules}
          />
        </div>

        {/* Other Languages */}
        {otherLanguages.map((lang) => (
          <div key={lang} className="mb-4">
            <Controller
              control={control}
              name={`${name}.${lang}`}
              render={({ field }) => (
                <>
                  <span className="flex flex-row gap-2 text-xs p-2">
                    {getLanguageName(lang)}
                    <TypeIcon
                      name="Languages"
                      size={16}
                      onClick={() =>
                        handleTranslate(
                          lang,
                          getLangValue(currentLang as any),
                          field.onChange,
                        )
                      }
                    />
                    {translatingLang === lang && (
                      <span className="text-xs text-blue-500">
                        Translating...
                      </span>
                    )}
                  </span>
                  {type === "textarea" ? (
                    <Textarea
                      {...field}
                      className="w-full"
                      disabled={disabled || translatingLang === lang}
                      radius={radius}
                      value={field.value ?? getLangValue(lang)}
                      onChange={(e) => {
                        const newValue = e.target.value;

                        field.onChange(newValue);
                        setLangValues((prev) => ({
                          ...prev,
                          [lang]: newValue,
                        }));
                        onChange?.({
                          ...langValues,
                          [lang]: newValue,
                        });
                      }}
                    />
                  ) : (
                    <Input
                      {...field}
                      className="w-full"
                      disabled={disabled || translatingLang === lang}
                      radius={radius}
                      value={field.value ?? getLangValue(lang)}
                      onChange={(e) => {
                        const newValue = e.target.value;

                        field.onChange(newValue);
                        setLangValues((prev) => ({
                          ...prev,
                          [lang]: newValue,
                        }));
                        onChange?.({
                          ...langValues,
                          [lang]: newValue,
                        });
                      }}
                    />
                  )}
                </>
              )}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{t(error.message)}</p>}
    </section>
  );
};

export default TypeLang;
