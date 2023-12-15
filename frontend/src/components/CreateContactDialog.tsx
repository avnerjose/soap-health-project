import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import validator from "validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export function CreateContactDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContactType>({
    resolver: zodResolver(CreateContactSchema),
  });

  const onSubmit = (data: CreateContactType) => {
    console.log(data);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Add new contact</DialogTitle>
          <DialogDescription>
            Fill out the following fields to add a new contact
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 my-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <Label htmlFor="firstName">First name</Label>
              <p className="text-red-500 text-sm">
                {errors.firstName?.message}
              </p>
            </div>
            <Input {...register("firstName")} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <Label htmlFor="lastName">Last name</Label>
              <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
            </div>
            <Input {...register("lastName")} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center justify-between">
              <Label htmlFor="phone">Phone number</Label>
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
            </div>
            <Input {...register("phone")} />
          </div>
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
