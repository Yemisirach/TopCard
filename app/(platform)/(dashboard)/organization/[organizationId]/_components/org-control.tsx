// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { auth } from "@auth"; // Import the auth function from NextAuth.js

// export const OrgControl = () => {
//   const router = useRouter();
//   const session = {

//   }; // Assuming auth() returns the user session

//   useEffect(() => {
//     // Assuming you have a session and the organizationId parameter
//     if (session && router.query.organizationId) {
//       // Your logic to set the active organization using NextAuth.js user and organizationId
//       console.log(
//         `Setting active organization for user ${session.user.email} to ${router.query.organizationId}`
//       );
//     }
//   }, [session, router.query.organizationId]);

//   return null;
// };
