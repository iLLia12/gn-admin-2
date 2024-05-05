import { Rules } from "../../../types/validation";
import { FieldError } from "react-hook-form";
import { inputClassName, labelClassName } from "../common.ts";

const TextArea = ({
  name,
  rules,
  register,
  value,
  error,
  placeholder = "",
}: {
  name: string;
  register: any;
  error: FieldError | undefined;
  placeholder?: string;
  rules?: Rules;
  value?: string | number;
}) => {
  return (
    <>
      <label htmlFor={name} className={labelClassName(!!error)}>
        {name}
      </label>
      <textarea
        id={name}
        rows={4}
        className={inputClassName(!!error)}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        {...register(name, rules || {})}
        value={value}
      ></textarea>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {error?.message}
        </p>
      )}
    </>
  );
};

export default TextArea;
