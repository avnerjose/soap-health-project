import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithErrorMessage } from "./InputWithErrorMessage";
import { api } from "@/services/api";

const CreateContactSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .refine(validator.isMobilePhone, {
      message: "Phone is not valid",
    }),
});

type CreateContactType = z.infer<typeof CreateContactSchema>;

interface CreateContactDialogProps {
    onSubmit: () => Promise<void>;
}

export function CreateContactDialog({
    onSubmit: submitCallback
}: CreateContactDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactType>({
    resolver: zodResolver(CreateContactSchema),
  });

  const onSubmit = async (data: CreateContactType) => {
    try {
      const { firstName, lastName, phone } = data;

      await api.post("/phone-book", {
        firstName,
        lastName,
        phone,
      });

      await submitCallback();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DialogContent className="sm:max-w-md bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Add new contact</DialogTitle>
          <DialogDescription>
            Fill out the following fields to add a new contact
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 my-4">
          <InputWithErrorMessage
            name="firstName"
            label="First name"
            register={register}
            error={errors.firstName?.message}
          />
          <InputWithErrorMessage
            name="lastName"
            label="LastName name"
            register={register}
            error={errors.lastName?.message}
          />
          <InputWithErrorMessage
            name="phone"
            label="Phone number"
            register={register}
            error={errors.phone?.message}
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="submit"
            className="border border-blue-500 text-blue-500 bg-blue-50"
          >
            Create new contact
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
