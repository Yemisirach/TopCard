// import { Suspense } from "react";
// import { Separator } from "@/components/ui/separator";
// // import { BoardList } from "./_components/board-list";

// const OrganizationIdPage = async () => {
//   return (
//     <div className="w-full mb-20">
//       <Separator className="my-4" />
//       <div className="px-2 md:px-4">
//         {/* <Suspense fallback={<BoardList.Skeleton />}>
//           <BoardList />
//         </Suspense> */}
//         hi yemi hi yemi hi yemi hi yemi hi yemi hi yemi hi yemi hi yemi hi yemi
//         hi yemi hi yemi
//       </div>
//     </div>
//   );
// };

// export default OrganizationIdPage;

"use server";

import { db } from "@/lib/db";

// import { Forms } from "./form";
// import { Organization } from "./Organization";
// import { FaBuilding } from "react-icons/fa";
import { OrganizationList } from "./_components/organization-list";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

const OrganizationForm = async () => {
  // const organizations = await db.organization.findMany();

  return (
    <div className="m-auto flex bg-white flex-col justify-center h-full w-[600px]">
      <OrganizationList />
    </div>
  );
};

export default OrganizationForm;

// "use client";
// import { useState, useEffect } from "react";
// import { createorg } from "@/actions/createorganization";
// import { Button } from "@/components/ui/button";
// import { db } from "@/lib/db";
// import { Organization } from "../organization/Organization";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// interface OrganizationData {
//   id: string;
//   name: string;
//   imageUrl: string | null;
// }

// const OrganizationForm = () => {
//   const [organizations, setOrganizations] = useState<OrganizationData[]>([]);
//   console.log("🚀 ~ OrganizationForm ~ organizations:", organizations);

//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         const organizationsData: OrganizationData[] =
//           await db.organization.findMany();
//         console.log("Organizations Data:", organizationsData);
//         setOrganizations(organizationsData);
//       } catch (error) {
//         console.error("Error fetching organizations:", error);
//       }
//     };

//     fetchOrganizations();
//   }, []);
//   // Empty dependency array to fetch data only once when the component mounts

//   return (
//     <Router>
//       <div className="mt-20 m-auto flex flex-col justify-center w-[400px] h-[300px] bg-slate-500">
//         <form className="mt-5" action={createorg}>
//           <input
//             className="p-3"
//             id="title"
//             type="title"
//             name="title"
//             required
//           />
//           <input className="p-3" id="image" type="file" name="image" />
//           <Button type="submit">Create org</Button>
//         </form>
//         <div>
//           {organizations.map((org) => (
//             <div key={org.id}>
//               Organization:{}
//               <Link to={`/organization/${org.id}`}>{org.name}</Link>
//               <Route
//                 path={`/organization/${org.id}`}
//                 element={<Organization name={org.name} id={org.id} />}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default OrganizationForm;
