// "use client";
// import { useEffect } from "react";
// import { currentUser } from "@/lib/auth";
// import { useSearchParams } from "next/navigation";

// export const OrgControl = () => {
//   const user = currentUser();
//   const [searchParams] = useSearchParams();
//   const organizationId = searchParams?.get("organizationId");

//   useEffect(() => {
//     const setActiveOrganization = async () => {
//       if (user && organizationId) {
//         try {
//           // Your logic to set the active organization using NextAuth.js user and organizationId
//           console.log(
//             `Setting active organization for user ${user?.email} to ${organizationId}`
//           );

//           // Example: Call a function to set the active organization
//           // setActiveOrganization(user.id, organizationId);
//         } catch (error) {
//           console.error("Error setting active organization:", error);
//         }
//       }
//     };

//     setActiveOrganization();
//   }, [user, organizationId]);

//   return null;
// };
