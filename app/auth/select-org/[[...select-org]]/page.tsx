// import React, { useState } from "react";
// import OrganizationForm from "@/components/auth/organizationForm";
// import OrganizationList from "@/components/auth/organizationForm";
// import { Organization } from "@prisma/client";
// import OrganizationSwitcher from "@/components/auth/OrganizationSwitcher";

// const CreateOrganizationPage: React.FC = () => {
//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [selectedOrganization, setSelectedOrganization] =
//     useState<Organization | null>(null);

//   const handleCreateOrganization = (newOrganization: Organization) => {
//     // Add the new organization to the list
//     setOrganizations((prevOrganizations) => [
//       ...prevOrganizations,
//       newOrganization,
//     ]);

//     // Set the newly created organization as the selected one
//     setSelectedOrganization(newOrganization);
//   };

//   const handleSelectOrganization = (organization: Organization) => {
//     // Set the selected organization
//     setSelectedOrganization(organization);
//   };

//   return (
//     <div>
//       <OrganizationForm onCreateOrganization={handleCreateOrganization} />
//       <OrganizationSwitcher
//         organizations={organizations}
//         selectedOrganization={selectedOrganization}
//         onSelectOrganization={handleSelectOrganization}
//       />
//       <OrganizationList organizations={organizations} />
//     </div>
//   );
// };

// export default CreateOrganizationPage;
