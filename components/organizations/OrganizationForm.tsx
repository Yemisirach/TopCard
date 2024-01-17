// components/organizations/OrganizationForm.ts

import React, { useState, ChangeEvent } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { createOrganization } from "../../lib/api";
import { UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrganizationFormProps {
  onCreateOrganization: (newOrganization: Organization) => void;
}

interface Organization {
  id: number;
  name: string;
  profileImage: string | null;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({
  onCreateOrganization,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      setSelectedFile(null);
      setImageUrl(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImageUrl(null);
  };

  const router = useRouter();


  const handleCreateOrganization = async () => {
    try {
      // Basic validation: Check if organization name is empty
      if (!name.trim()) {
        setError("Please enter the organization name");
        return;
      }

      const orgId = await createOrganization(name, selectedFile);

      // Handle successful organization creation, e.g., show a success message
      console.log("New Organization Id:", orgId);

      // Redirect to the newly created organization's page
      router.push(`/organization/${orgId}`);
    } catch (error) {
      setError("Error occurred");
    }
  };

  return (
    <Card className="bg-white m-auto flex align-middle justify-center h-[400px] w-[380px] border-gray-500">
      <div className="h-[500px]  flex justify-center align-middle mt-7">
        <div className="w-[327px] p-4 align-middle flex flex-col">
          <h2 className="mt-2 mb-3 text-center text-2xl font-semibold">
            Create Organization
          </h2>
          <div className="mb-3 flex flex-row justify-center w-[250px]">
            <div className="flex flex-col mt-3 w-[100px]">
              <article>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Selected"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </article>
              <div className="flex align-middle justify-center">
                <label htmlFor="fileInput" className="upload-label">
                  <div className="flex align-middle justify-center">
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
                {selectedFile && (
                  <p className="text-left size-sm">{selectedFile.name}</p>
                )}
              </article>
              <div className="text-gray-600 mt-2 ml-2">
                Upload Profile Image
                <article
                  className="text-orange-600 close cursor-pointer"
                  onClick={handleRemoveImage}
                >
                  Remove
                </article>
              </div>
            </div>
          </div>
          <label className="mb-3">
            Organization Name:
            <input
              className="w-[295px] orginput border-gray-600 Top-inputs p-3"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {error && <p className="text-red-500 mb-3">{error}</p>}
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
