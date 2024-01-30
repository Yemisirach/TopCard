// // // OrganizationForm.js

// // import React, { useState } from "react";
// // import { UploadIcon } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card";
// // import { Organization } from "@prisma/client";
// // import axios from "axios";

// // interface OrganizationFormProps {
// //   onCreateOrganization: (newOrganization: Organization) => void;
// // }

// // const OrganizationForm: React.FC<OrganizationFormProps> = ({
// //   onCreateOrganization,
// // }) => {
// //   // State for the organization name input
// //   const [organizationName, setOrganizationName] = useState<string>("");

// //   // State for the selected file and image URL
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [image, setimage] = useState<string | null>(null);

// //   // Function to handle organization creation
// //   const handleCreateOrganization = async () => {
// //     try {
// //       // Basic validation: Check if organization name is empty
// //       if (organizationName.trim() === "") {
// //         // Show an alert if the organization name is not provided
// //         alert("Please enter the organization name");
// //         return;
// //       }

// //       // Create a FormData object for sending a multipart/form-data request
// //       const formData = new FormData();
// //       formData.append("name", organizationName);
// //       formData.append("image", selectedFile as File);

// //       // Send a POST request to the server with the organization data
// //       const response = await axios.post(
// //         "http://localhost:3000/api/organizations",
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "application/json", // Set the Content-Type header to JSON
// //           },
// //         }
// //       );

// //       // Log the server response for debugging
// //       console.log("Server Response:", response.data);

// //       // Get the created organization from the response
// //       const newOrganization: Organization = response.data;
// //       console.log(
// //         "🚀 ~ handleCreateOrganization ~ newOrganization:",
// //         newOrganization
// //       );

// //       // Pass the new organization to the parent component
// //       onCreateOrganization(newOrganization);

// //       // Clear the form after creating the organization
// //       setOrganizationName("");
// //       setSelectedFile(null);
// //       setimage(null);
// //     } catch (error) {
// //       // Handle errors: log to console and show an alert
// //       console.error("Error creating organization:", error);
// //       alert("Error creating organization. Please try again.");
// //     }
// //   };

// //   // Function to handle file change for image upload
// //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0];

// //     if (file) {
// //       // If a file is selected, update the state and create a URL for preview
// //       setSelectedFile(file);
// //       const url = URL.createObjectURL(file);
// //       setimage(url);
// //     } else {
// //       // If no file is selected, clear the state
// //       setSelectedFile(null);
// //       setimage(null);
// //     }
// //   };

// //   // Function to handle removing the selected image
// //   const handleRemoveImage = () => {
// //     // Clear the selected file and image URL
// //     setSelectedFile(null);
// //     setimage(null);
// //   };

// //   // Render the OrganizationForm component
// //   return (
// //     <Card className="bg-white m-auto flex align-middle justify-center h-[400px] w-[380px] border-gray-500">
// //       <div className="h-[500px]  flex justify-center align-middle mt-7">
// //         <div className="w-[327px] p-4 align-middle flex flex-col">
// //           <h2 className="mt-2 mb-3 text-center text-2xl font-semibold">
// //             Create Organization
// //           </h2>

// //           {/* File upload section */}
// //           <div className="mb-3 flex flex-row justify-center w-[250px]">
// //             <div className="flex flex-col mt-3 w-[100px]">
// //               <article>
// //                 {/* Display the selected image */}
// //                 {image && (
// //                   <img
// //                     src={image}
// //                     alt="Selected"
// //                     style={{ maxWidth: "100px", maxHeight: "100px" }}
// //                   />
// //                 )}
// //               </article>
// //               <div className="flex align-middle justify-center">
// //                 {/* Label for the file input */}
// //                 <label htmlFor="fileInput" className="upload-label">
// //                   <div className="flex align-middle justify-center">
// //                     <UploadIcon />
// //                   </div>
// //                 </label>
// //                 {/* File input for image upload */}
// //                 <input
// //                   className="text-white visually-hidden"
// //                   type="file"
// //                   id="fileInput"
// //                   accept=".png, .jpg, .jpeg, .gif"
// //                   onChange={handleFileChange}
// //                 />
// //               </div>
// //             </div>

// //             {/* Display the selected file name */}
// //             <div className="flex flex-row">
// //               <article>
// //                 {/* Display the selected file name if a file is selected */}
// //                 {selectedFile && (
// //                   <p className="text-left size-sm">{selectedFile.name}</p>
// //                 )}
// //               </article>
// //               {/* Image upload details and remove option */}
// //               <div className="text-gray-600 mt-2 ml-2">
// //                 Upload Profile Image
// //                 <article
// //                   className="text-orange-600 close cursor-pointer"
// //                   onClick={handleRemoveImage}
// //                 >
// //                   Remove
// //                 </article>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Organization name input */}
// //           <label className="mb-3">
// //             Organization Name:
// //             <input
// //               className="w-[295px] orginput border-gray-600 Top-inputs p-3"
// //               type="text"
// //               value={organizationName}
// //               onChange={(e) => setOrganizationName(e.target.value)}
// //             />
// //           </label>

// //           {/* Button to create organization */}
// //           <Button
// //             className="mb-3"
// //             variant="primary"
// //             onClick={handleCreateOrganization}
// //           >
// //             Create Organization
// //           </Button>
// //         </div>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default OrganizationForm;

// // OrganizationForm.tsx
// // Assuming this is your OrganizationForm component

// // Assuming this is your OrganizationForm component
// import { useRef, forwardRef, KeyboardEventHandler } from "react";
// import { useOnClickOutside, useEventListener } from "usehooks-ts";
// import { useAction } from "@/hooks/use-action";
// import { createOrganization } from "@/actions/createOrganization";
// import { Button } from "@/components/ui/button";
// import { FormSubmit } from "@/components/form/form-submit";
// import { FormInput } from "@/components/form/form-input";
// import { auth } from "@/auth";
// import { currentUser } from "@/lib/auth";

// interface OrganizationFormProps {
//   enableEditing: () => void;
//   disableEditing: () => void;
//   isEditing: boolean;
// }

// export const OrganizationForm = forwardRef<
//   HTMLFormElement,
//   OrganizationFormProps
// >(({ enableEditing, disableEditing, isEditing }, ref) => {
//   const formRef = useRef<HTMLFormElement>(null);

//   const { execute, fieldErrors } = useAction(createOrganization, {
//     onSuccess: (data) => {
//       console.log("Organization created:", data);
//       // You can add any success handling logic here
//       formRef.current?.reset();
//     },
//     onError: (error) => {
//       console.error("Error creating organization:", error);
//       // You can add any error handling logic here
//     },
//   });

//   const onKeyDown = (e: KeyboardEvent) => {
//     if (e.key === "Escape") {
//       disableEditing();
//     }
//   };

//   useOnClickOutside(formRef, disableEditing);
//   useEventListener("keydown", onKeyDown);
//   var session = auth();
//   console.log("🚀 ~ session:", session);
//   const user = currentUser();
//   const onSubmit = (formData: FormData) => {
//     const name = formData.get("name") as string;
//     const image = formData.get("image") as string;
//     const userId = session.user.id;
//     execute({ name, image, userId });
//   };

//   if (isEditing) {
//     return (
//       <form
//         ref={formRef}
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSubmit(new FormData(e.currentTarget));
//         }}
//         className="m-1 py-0.5 px-1 space-y-4"
//       >
//         <FormInput
//           type="text"
//           id="name"
//           placeholder="Enter organization name..."
//           errors={fieldErrors}
//         />
//         <FormInput
//           type="text"
//           id="image"
//           placeholder="Enter organization image URL..."
//           errors={fieldErrors}
//         />
//         <div className="flex items-center gap-x-1">
//           <FormSubmit>Add organization</FormSubmit>
//           <Button onClick={disableEditing} size="sm" variant="ghost">
//             Cancel
//           </Button>
//         </div>
//       </form>
//     );
//   }

//   return (
//     <div className="pt-2 px-2">
//       <Button
//         onClick={enableEditing}
//         className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
//         size="sm"
//         variant="ghost"
//       >
//         Add an organization
//       </Button>
//     </div>
//   );
// });

// OrganizationForm.displayName = "OrganizationForm";
