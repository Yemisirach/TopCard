"use client";
import { CreateOrganizations } from "@/actions/createOrganization";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
// import { FormButton } from "@/components/form/form-button";

export const Forms = () => {
  const { execute, fieldErrors } = useAction(CreateOrganizations, {
    onSuccess(data) {
      console.log("success", data);
    },
    onError(error) {
      console.log(error, "error");
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const image = formData.get("image") as any;

    execute({ name, image });
  };

  return (
    <form className="mt-5" action={onSubmit}>
      {/* <FormInput errors={fieldErrors}/> */}
      <input className="p-3" id="title" type="title" name="title" required />
      {/* {state?.errors?.name && (
        <div>
          {state.errors.name.map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      )} */}

      <input className="p-3" id="image" type="file" name="image" />
      {/* {state?.errors?.image && (
        <div>
          {state.errors.image.map((error: string) => (
            <p key={error} className="text-rose-500">
              {error}
            </p>
          ))}
        </div>
      )} */}

      <Button type="submit">Create org</Button>
    </form>
  );
};
