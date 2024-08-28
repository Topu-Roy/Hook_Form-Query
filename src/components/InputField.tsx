import { cn } from "@/lib/utils";
import {
  Controller,
  type PathValue,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type: string;
  control: Control<T, unknown>;
  placeholder?: string;
  id: string;
  valueAsNumber?: boolean;
};

export function InputField<T extends FieldValues>({
  label,
  type,
  name,
  placeholder,
  id,
  control,
  valueAsNumber = false,
}: InputFieldProps<T>) {
  return valueAsNumber ? (
    <Controller
      name={name}
      control={control}
      defaultValue={(type === "number" ? null : "") as PathValue<T, Path<T>>}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <div className="w-full">
          <label className="text-lg font-semibold" htmlFor={id}>
            {label}
          </label>
          <input
            {...field}
            value={value ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              onChange(
                type === "number" ? (val === "" ? null : Number(val)) : val,
              );
            }}
            className={cn(
              "w-full rounded-md border border-gray-800/40 px-4 py-2 focus:outline-blue-600",
              error?.message ? "ring-[1px] ring-rose-500" : "",
            )}
            type={type}
            placeholder={placeholder}
            id={id}
          />
          {error ? <p className="pt-2 text-rose-500">{error.message}</p> : null}
        </div>
      )}
    />
  ) : (
    <Controller
      name={name}
      control={control}
      defaultValue={"" as PathValue<T, Path<T>>}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <label className="text-lg font-semibold" htmlFor={id}>
            {label}
          </label>
          <input
            {...field}
            className={cn(
              "w-full rounded-md border border-gray-800/40 px-4 py-2 focus:outline-blue-600",
              error?.message ? "ring-[1px] ring-rose-500" : "",
            )}
            type={type}
            placeholder={placeholder}
            id={id}
          />
          {error ? <p className="pt-2 text-rose-500">{error.message}</p> : null}
        </div>
      )}
    />
  );
}
