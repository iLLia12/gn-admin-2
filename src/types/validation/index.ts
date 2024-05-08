export type Rules = {
  required?: boolean | string | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: string | { value: number; message: string };
  validate?: () => void;
};
