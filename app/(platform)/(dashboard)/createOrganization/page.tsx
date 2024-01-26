// import { admin } from "@/actions/admin";
// import { RoleGate } from "@/components/auth/role-gate";
// import { FormSuccess } from "@/components/form-success";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/";
// import { UserRole } from "@prisma/client";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { OrgSchema } from "@/schemas";
// import * as z from "zod";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import { creatOrganization } from "@/actions/creatOrganization";
// import { useState, useTransition } from "react";
// import { useSearchParams } from "next/navigation";
// import { FormError } from "@/components/form-error";
// import { useForm } from "react-hook-form";
// import { UploadIcon } from "@radix-ui/react-icons";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// const AdminPage = () => {
//   const searchParams = useSearchParams();
//   const callbackUrl = searchParams.get("callbackUrl");
//   const urlError =
//     searchParams.get("error") === "OAuthAccountNotLinked"
//       ? "Organization already in use with different provider!"
//       : "";

//   const [error, setError] = useState<string | undefined>("");
//   const [success, setSuccess] = useState<string | undefined>("");
//   const [isPending, startTransition] = useTransition();

//   const onSubmit = async (values: z.infer<typeof OrgSchema>) => {
//     try {
//       const response = await fetch(
//         "https://localhost:3000/createOrganization",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(OrgSchema),
//         }
//       );

//       if (response.ok) {
//         console.log("Form data submitted successfully:", OrgSchema);
//       } else {
//         console.error(
//           "Error submitting form. Server returned:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);

//     // Create a URL for the selected file
//     const url = URL.createObjectURL(file);
//     setImageUrl(url);
//   };

//   const form = useForm<z.infer<typeof OrgSchema>>({
//     resolver: zodResolver(OrgSchema),
//     defaultValues: {
//       orgname: "",
//       role: UserRole,
//       image: Image, // Use 'image' instead of 'Image'
//     },
//   });

//   return (
//     // <Card className="w-[400px]">
//     <CardContent className="space-y-4 w-[400px] h-[500px]">
//       <div className="bg-white  flex flex-col items-center justify-between rounded-lg border p-3 shadow-md">
//         <CardHeader>
//           <p className="text-2xl font-semibold text-center">
//             Create Organization
//           </p>
//         </CardHeader>
//         {/* <RoleGate allowedRole={UserRole.ADMIN}>
//             <FormSuccess message="You are allowed to see this content!" />
//           </RoleGate> */}
//         {/* <p className="text-lg mb-5 font-medium">Create Organization</p> */}
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="w-[300px] space-y-6"
//           >
//             <div className="space-y-4">
//               <>
//                 <div className="w-[140px] h-30 align-middle flex justify-between flex-row">
//                   <input
//                     type="file"
//                     id="fileInput"
//                     accept=".png, .jpg, .jpeg, .gif"
//                     onChange={handleFileChange}
//                   />
//                     <UploadIcon />
//                   <div className="flex flex-col">
//                     <article>
//                       {" "}
//                       {imageUrl && (
//                         <img
//                           src={imageUrl}
//                           alt="Selected"
//                           style={{ maxWidth: "100%", maxHeight: "300px" }}
//                         />
//                       )}
//                     </article>
//                     <article>
//                       {" "}
//                       {selectedFile && <p>{selectedFile.name}</p>}
//                     </article>
//                   </div>

//                   <div className="text-gray-600">
//                     Upload Profile Image
//                     <article className="text-orange-600 close">Remove</article>
//                   </div>
//                 </div>

//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isPending}
//                       placeholder=""
//                       type="text"
//                       className="Top-inputs"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//                 <FormField
//                   control={form.control}
//                   name="role"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Role</FormLabel>
//                       <Select
//                         disabled={isPending}
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a role" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
//                           <SelectItem value={UserRole.USER}>User</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </>
//             </div>
//             <FormError message={error || urlError} />
//             <FormSuccess message={success} />
//             <Button
//               disabled={isPending}
//               type="submit"
//               className="bg-gray-600 Top-inputs w-full"
//             >
//               Create Organization
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </CardContent>
//     // </Card>
//   );
// };

// export default AdminPage;

// Import necessary dependencies

// Import necessary dependencies
// import React, { useState } from "react";
// import OrganizationForm from "@/components/OrganizationForm";
// import { Organization } from "@prisma/client";
// import { useRouter } from "next/navigation";

// // Create the CreateOrganizationPage component
// const CreateOrganizationPage: React.FC = () => {
//   // State to manage the list of organizations and the selected organization
//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [selectedOrganization, setSelectedOrganization] =
//     useState<Organization | null>(null);

//   // Initialize the Next.js router
//   const router = useRouter();

//   // Handler function for creating a new organization
//   const handleCreateOrganization = (newOrganization: Organization) => {
//     // Update the list of organizations with the newly created one
//     setOrganizations((prevOrganizations) => [
//       ...prevOrganizations,
//       newOrganization,
//     ]);

//     // Set the newly created organization as the selected one
//     setSelectedOrganization(newOrganization);

//     // Redirect to the organization details page
//     router.push(`/organization/${newOrganization.id}`);
//   };

//   // Handler function for selecting an existing organization
//   const handleSelectOrganization = (organization: Organization) => {
//     // Set the selected organization
//     setSelectedOrganization(organization);
//   };

//   return (
//     <div className="mt-20 pt-10">
//       <div className="h-[500px] w-[380px] m-auto align-middle">
//         {/* Your other components or content here */}

//         {/* Render the OrganizationForm component */}
//         <OrganizationForm onCreateOrganization={handleCreateOrganization} />

//         {/* Optionally render other components like OrganizationSwitcher or OrganizationList */}
//       </div>
//     </div>
//   );
// };

// export default CreateOrganizationPage;

"use client";

import { forwardRef } from "react";
import { useAction } from "@/hooks/use-action";
import { createOrganization } from "@/actions/createOrganization";
import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { FormInput } from "@/components/form/form-input";
import { currentUser } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/auth/header";

interface OrganizationFormProps {
  onCreateOrganization: () => void;
}

const OrganizationForm = forwardRef<HTMLFormElement, OrganizationFormProps>(
  ({ onCreateOrganization }, ref) => {
    const { execute, fieldErrors } = useAction(createOrganization);

    const onSubmit = async (formData: FormData) => {
      const name = formData.get("name") as string;
      const imageUrl = formData.get("imageUrl") as string;
  
      try {
        const organization = await execute({ name, imageUrl });

        // Optionally, you can handle the success scenario here
        console.log("Organization created:", organization);

        // Invoke the callback to inform the parent component
        onCreateOrganization();
      } catch (error) {
        // Optionally, you can handle the error scenario here
        console.error("Error creating organization:", error);
      }
    };

    return (
      <div className="mt-20 h-[300px] flex justify-center align-middle">
        <Card className="w-[400px] p-4 gap-6 bg-white h-[300px] flex flex-col justify-center align-middle">
          <Header label="Create a new organization"></Header>
          <form
            ref={ref}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(new FormData(e.currentTarget));
            }}
            className="m-1 py-0.5 px-1 space-y-4"
          >
            <FormInput
              className="Topinputs h-[40px]"
              type="text"
              id="name"
              placeholder="Enter organization name..."
              errors={fieldErrors}
            />
            <FormInput
              className="Topinputs"
              type="text"
              id="imageUrl"
              placeholder="Enter organization image URL..."
              errors={fieldErrors}
            />
            <div className="flex items-center  gap-x-1">
              <FormSubmit className="w-[220px]">Create organization</FormSubmit>
              {/* 
            Note: You might not need a cancel button for creating organizations,
            but you can customize this as needed.
          */}
              <Button className="bg-gray-200 " size="sm" variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
);

OrganizationForm.displayName = "OrganizationForm";

export default OrganizationForm;
