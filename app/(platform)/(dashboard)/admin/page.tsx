// "use client";

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

// import React, { useState } from "react";
// import OrganizationForm from "@/app/api/organizations";
// import OrganizationList from "@/app/api/organizations";
// import { Organization, UserRole } from "@prisma/client";
// import OrganizationSwitcher from "@/components/auth/OrganizationSwitcher";
// import { RoleGate } from "@/components/auth/role-gate";
// import { FormSuccess } from "@/components/form-success";
// import { redirect } from "next/navigation";

// const CreateOrganizationPage: React.FC = () => {
//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [selectedOrganization, setSelectedOrganization] =
//     useState<Organization | null>(null);
//   const orgId = 007164ea-d03f-4919-b03a-51fed02d768f2;
//   const handleCreateOrganization = (newOrganization: Organization) => {
//     // Add the new organization to the list
//     setOrganizations((prevOrganizations) => [
//       ...prevOrganizations,
//       newOrganization,
//     ]);

//     // Set the newly created organization as the selected one
//     setSelectedOrganization(newOrganization);
//     redirect(`/organization/${orgId}`);
//   };

//   const handleSelectOrganization = (organization: Organization) => {
//     // Set the selected organization
//     setSelectedOrganization(organization);
//   };

//   return (
//     <div className="mt-20 pt-10">
//       <div className="h-[500px] w-[380px] m-auto align-middle">
//         {/* <RoleGate allowedRole={UserRole.ADMIN}>
//           <FormSuccess message="You are allowed to see this content!" />
//         </RoleGate> */}
//         <p className="text-lg flex align-middle w-[380px] font-medium"></p>

//         <OrganizationForm onCreateOrganization={handleCreateOrganization} />
//         {/* <OrganizationSwitcher
//           organizations={organizations}
//           selectedOrganization={
//             selectedOrganization}
//           onSelectOrganization={handleSelectOrganization}
//         /> */}
//         {/* <OrganizationList organizations={organizations} /> */}
//       </div>
//     </div>
//   );
// };

// export default CreateOrganizationPage;
