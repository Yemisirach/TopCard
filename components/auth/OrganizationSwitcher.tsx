import React from 'react';
import Organization from './OrganizationModel';

interface OrganizationSwitcherProps {
  organizations: Organization[];
  selectedOrganization: Organization | null;
  onSelectOrganization: (organization: Organization) => void;
}

const OrganizationSwitcher: React.FC<OrganizationSwitcherProps> = ({
  organizations,
  selectedOrganization,
  onSelectOrganization,
}) => {
  return (
    <div>
      <h2>Organization Switcher</h2>
      <label>
        Select Organization:
        <select
          value={selectedOrganization ? selectedOrganization.id : ''}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedOrg = organizations.find((org) => org.id === Number(selectedId));
            if (selectedOrg) {
              onSelectOrganization(selectedOrg);
            }
          }}
        >
          <option value="" disabled>
            Select an organization
          </option>
          {organizations.map((organization) => (
            <option key={organization.id} value={organization.id}>
              {organization.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default OrganizationSwitcher;
