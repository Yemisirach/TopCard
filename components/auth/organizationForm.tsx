// OrganizationForm.tsx

import React, { useState } from "react";
import Organization from "./organizationModel";
import { UploadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Create a URL for the selected file
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  return (
    <Card className="bg-white m-auto flex align-middle justify-center h-[400px] w-[380px] border-gray-500">
      <div className="h-[500px]  flex justify-center align-middle mt-7">
        <div className="w-[327px] p-4 align-middle   flex flex-col">
          <h2 className="mt-2 mb-3 text-center text-2xl font-semibold">
            Create Organization
          </h2>
          <div className="mb-3 flex flex-row justify-center w-[250px]">
            <div className="flex flex-col mt-3 w-[100px]">
              <article>
                {" "}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Selected"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </article>
              <div className="flex  align-middle justify-center">
                <label htmlFor="fileInput" className="upload-label">
                  <div className="flex  align-middle justify-center">
                    <UploadIcon />
                  </div>
                </label>
                <input
                  className="text-white visually-hidden"
                  type="file"
                  id="fileInput"
                  accept=".png, .jpg, .jpeg, .gif"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex flex-row">
              <article>
                {" "}
                {selectedFile && (
                  <p className="text-left size-sm">{selectedFile.names}</p>
                )}
              </article>
              <div className="text-gray-600 mt-2 ml-2">
                Upload Profile Image
                <article className="text-orange-600 close">Remove</article>
              </div>
            </div>
          </div>
          <label className="mb-3">
            Organization Name:
            <input
              className="w-[295px] orginput border-gray-600 Top-inputs p-3"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </label>
          <Button
            className="mb-3"
            variant={"primary"}
            onClick={handleCreateOrganization}
          >
            Create Organization
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OrganizationForm;
