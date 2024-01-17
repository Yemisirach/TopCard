// frontend/components/WorkspaceList.tsx

import React from "react";

interface WorkspaceListProps {
  workspaces?: { id: number; name: string }[]; // Make workspaces optional
  onWorkspaceChange: (workspaceId: number) => void;
}

const WorkspaceList: React.FC<WorkspaceListProps> = ({
  workspaces = [],
  onWorkspaceChange,
}) => {
  return (
    <div>
      <h2>Workspaces</h2>
      <ul>
        {workspaces?.length > 0 ? (
          workspaces.map((workspace) => (
            <li key={workspace.id}>
              <button onClick={() => onWorkspaceChange(workspace.id)}>
                {workspace.name}
              </button>
            </li>
          ))
        ) : (
          <p>No workspaces available.</p>
        )}
      </ul>
    </div>
  );
};

export default WorkspaceList;
