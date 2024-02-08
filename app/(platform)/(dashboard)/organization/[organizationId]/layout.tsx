// import { startCase } from "lodash";
// import { auth } from "@clerk/nextjs";

// import { OrgControl } from "./_components/org-control";

export async function generateMetadata() {
  // const orgSlug = e153fc92-3787-4c83-a166-1b103a506c4a;
  // return {
  //   title: startCase(orgSlug || "organization"),
  // };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <OrgControl /> */}
      {children}
    </>
  );
};

export default OrganizationIdLayout;
