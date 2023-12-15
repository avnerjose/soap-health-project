import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputWithErrorMessageProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  label: string;
  error?: string;
}

export function InputWithErrorMessage<T extends FieldValues>({
  register,
  name,
  label,
  error
}: InputWithErrorMessageProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-between">
        <Label htmlFor={name}>{label}</Label>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <Input {...register(name)} />
    </div>
  );
}
