"use client";

import { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { CreateOrganizations } from "@/actions/createOrganization";
import { useProModal } from "@/hooks/use-pro-modal";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { FormPicker } from "./form-picker";
import { revalidatePath } from "next/cache";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const OrgFormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const proModal = useProModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute, fieldErrors } = useAction(CreateOrganizations, {
    onSuccess: (data) => {
      toast.success("Organization created!");
      closeRef.current?.click();
      router.push(`/organization/${data.id}`);
      revalidatePath(`/organization/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
      proModal.onOpen();
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    execute({ name, image });
   

  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3 create-work"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center  text-neutral-600 pb-4">
          Create Workspace
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="name"
              label="Workspace Name"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create Workspace</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
