import { Rules } from "../../../types/validation";
import { FieldError } from "react-hook-form";
import { inputClassName, labelClassName } from "../common.ts";

const Input = ({
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
  rules?: Rules;
  value?: string | number;
  placeholder?: string;
}) => {
  return (
    <>
      <label htmlFor={name} className={labelClassName(!!error)}>
        {name}
      </label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        className={inputClassName(!!error)}
        aria-invalid={error ? "true" : "false"}
        value={value}
        {...register(name, rules || {})}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {error?.message}
        </p>
      )}
    </>
  );
};
// block mb-2 text-sm font-medium text-red-700 dark:text-red-500
export default Input;
