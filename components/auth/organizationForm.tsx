// OrganizationForm.tsx

import React, { useState } from "react";
import Organization from "./organizationModel";

interface OrganizationFormProps {
  onCreateOrganization: (newOrganization: Organization) => void;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({
  onCreateOrganization,
}) => {
  const [organizationName, setOrganizationName] = useState<string>("");

  const handleCreateOrganization = () => {
    // Basic validation
    if (organizationName.trim() === "") {
      alert("Please enter the organization name");
      return;
    }

    // Create an organization object
    const newOrganization: Organization = {
      id: Math.random(),
      name: organizationName,
    };

    // Pass the new organization to the parent component
    onCreateOrganization(newOrganization);

    // Clear the form after creating the organization
    setOrganizationName("");
  };

  return (
    <div>
      <h2>Create Organization</h2>
      <label>
        Organization Name:
        <input
          type="text"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
      </label>
      <button onClick={handleCreateOrganization}>Create Organization</button>
    </div>
  );
};

export default OrganizationForm;
