import React from "react";
import Organization from "./organizationModel";

interface OrganizationListProps {
  organizations: Organization[];
}

const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
}) => {
  return (
    <div>
      <h2>Organization List</h2>
      <ul>
        {organizations.map((organization) => (
          <li key={organization.id}>{organization.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationList;
