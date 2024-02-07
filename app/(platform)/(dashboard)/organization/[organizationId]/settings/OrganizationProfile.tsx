import React from 'react';

interface AppearanceProps {
  elements: {
    rootBox: {
      boxShadow: string;
      width: string;
    };
    card: {
      border: string;
      boxShadow: string;
      width: string;
    };
  };
}

interface OrganizationProfileProps {
  appearance: AppearanceProps;
}

const OrganizationProfile: React.FC<OrganizationProfileProps> = ({ appearance }) => {
  const { rootBox, card } = appearance.elements;

  return (
    <div style={{ ...rootBox, margin: '10px' }}>
      <div style={{ ...card, padding: '20px' }}>
        {/* Add your organization profile content here */}
        <h2>Organization Profile</h2>
        <p>This is where your organization profile content goes.</p>
      </div>
    </div>
  );
};

export default OrganizationProfile;
