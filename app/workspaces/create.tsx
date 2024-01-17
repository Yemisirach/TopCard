// pages/workspaces/create.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Workspace {
  id: number;
  name: string;
  profileImage: string | null;
}
export default function CreateWorkspace() {
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState("");

  const createWorkspace = async () => {
    try {
      const response = await fetch("/api/workspaces/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workspaceName }),
      });
      console.log(response, "response");

      if (response.ok) {
        const newWorkspace = await response.json();
        router.push(`/workspaces/${newWorkspace.id}`);
      } else {
        console.error("Error creating workspace:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };
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

  return (
    <div>
      {/* <h1>Create a Workspace</h1>
      <input
        type="text"
        placeholder="Workspace Name"
        value={workspaceName}
        onChange={(e) => setWorkspaceName(e.target.value)}
      /> */}
      <button onClick={createWorkspace}>Create Workspace</button>
      <Card className="bg-white m-auto flex align-middle justify-center h-[400px] w-[380px] border-gray-500">
        <div className="h-[500px]  flex justify-center align-middle mt-7">
          <div className="w-[327px] p-4 align-middle flex flex-col">
            <h2 className="mt-2 mb-3 text-center text-2xl font-semibold">
              Create a Workspace
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
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
            </label>
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <Button
              className="mb-3"
              variant={"primary"}
              onClick={createWorkspace}
            >
              Create Workspace
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
