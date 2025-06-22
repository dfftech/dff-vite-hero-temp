import {
  Controller,
  Control,
  FieldError,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { lazy } from "react";

// Dynamically load the Markdown Editor
const MDEditor = lazy(() => import("@uiw/react-md-editor"));

type MdxEditorProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  label?: string;
  error?: FieldError;
  disabled?: boolean;
};

const TypeMdxEditor = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  error,
  disabled = false,
}: MdxEditorProps<T>) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules} // or use a prop if needed
        render={({ field }) => (
          <MDEditor
            value={field.value ?? ""}
            onChange={(val) => field.onChange(val)}
            height={400}
            previewOptions={{}}
            textareaProps={{ disabled }}
          />
        )}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}
    </div>
  );
};

export default TypeMdxEditor;
