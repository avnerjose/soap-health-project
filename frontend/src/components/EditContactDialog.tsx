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
import { PhoneBookEntry } from "@/entities/PhoneBookEntry";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

const EditContactSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(
      new RegExp(
        /(\d{3}[-.\s]??\d{3}[-.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-.\s]??\d{4}|\d{3}[-.\s]??\d{4})/
      ),
      {
        message: "Phone is not valid",
      }
    )
    .refine(validator.isMobilePhone, {
      message: "Phone is not valid",
    }),
});

type EditContactType = z.infer<typeof EditContactSchema>;

interface EditContactDialogProps {
  onSubmit: () => Promise<void>;
  contactToEdit: PhoneBookEntry;
}

export function EditContactDialog({
  onSubmit: submitCallback,
  contactToEdit,
}: EditContactDialogProps) {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditContactType>({
    resolver: zodResolver(EditContactSchema),
  });

  useEffect(() => {
    reset({
      firstName: contactToEdit.firstName,
      lastName: contactToEdit.lastName,
      phone: contactToEdit.phone,
    });
  }, [contactToEdit, reset]);

  const onSubmit = async (data: EditContactType) => {
    try {
      const { id } = contactToEdit;
      const { firstName, lastName, phone } = data;

      toast({
        title: "Editing contact...",
      });

      await api.put(`/phone-book/${id}`, {
        firstName,
        lastName,
        phone,
      });
      await submitCallback();

      toast({
        title: "Contact edited successfully",
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
      console.log(e);
    }
  };

  return (
    <DialogContent className="sm:max-w-md bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Edit contact</DialogTitle>
          <DialogDescription>
            Edit the fields you want to Edit
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
            Edit contact
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
