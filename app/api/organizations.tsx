import React, { useState } from "react";
import { UploadIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Organization } from "@prisma/client";
import axios from "axios";

interface OrganizationFormProps {
  onCreateOrganization: (newOrganization: Organization) => void;
}

const organizations: React.FC<OrganizationFormProps> = ({
  onCreateOrganization,
}) => {
  // State for the organization name input
  const [organizationName, setOrganizationName] = useState<string>("");

  // State for the selected file and image URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Function to handle organization creation
  const handleCreateOrganization = async () => {
    try {
      // Basic validation: Check if organization name is empty
      if (organizationName.trim() === "") {
        alert("Please enter the organization name");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/organizations", // Update the URL
        {
          name: organizationName,
          imageUrl: imageUrl,
        }
      );

      console.log(response, "resp");
      // Get the created organization from the response
      const newOrganization: Organization = response.data;

      // Pass the new organization to the parent component
      onCreateOrganization(newOrganization);

      // Clear the form after creating the organization
      setOrganizationName("");
      setSelectedFile(null);
      setImageUrl(null);
    } catch (error) {
      console.error("Error creating organization:", error);
      // Handle error (show an alert, log to console, etc.)
    }
  };

  // Function to handle file change for image upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      // Create a URL for the selected file
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      // If no file is selected, clear the selected file and image URL
      setSelectedFile(null);
      setImageUrl(null);
    }
  };

  const handleRemoveImage = () => {
    // Clear the selected file and image URL
    setSelectedFile(null);
    setImageUrl(null);
  };

  // Render the OrganizationForm component
  return (
    <Card className="bg-white m-auto flex align-middle justify-center h-[400px] w-[380px] border-gray-500">
      <div className="h-[500px]  flex justify-center align-middle mt-7">
        <div className="w-[327px] p-4 align-middle flex flex-col">
          <h2 className="mt-2 mb-3 text-center text-2xl font-semibold">
            Create Organization
          </h2>

          {/* File upload section */}
          <div className="mb-3 flex flex-row justify-center w-[250px]">
            <div className="flex flex-col mt-3 w-[100px]">
              <article>
                {" "}
                {/* Display the selected image */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Selected"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </article>
              <div className="flex align-middle justify-center">
                {/* Label for the file input */}
                <label htmlFor="fileInput" className="upload-label">
                  <div className="flex align-middle justify-center">
                    <UploadIcon />
                  </div>
                </label>
                {/* File input for image upload */}
                <input
                  className="text-white visually-hidden"
                  type="file"
                  id="fileInput"
                  accept=".png, .jpg, .jpeg, .gif"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Display the selected file name */}
            <div className="flex flex-row">
              <article>
                {" "}
                {selectedFile && (
                  <p className="text-left size-sm">{selectedFile.name}</p>
                )}
              </article>
              {/* Image upload details and remove option */}
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

          {/* Organization name input */}
          <label className="mb-3">
            Organization Name:
            <input
              className="w-[295px] orginput border-gray-600 Top-inputs p-3"
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </label>

          {/* Button to create organization */}
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

export default organizations;
