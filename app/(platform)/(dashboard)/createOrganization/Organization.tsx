"use client";

import { deletorg } from "@/actions/delete/delet";
import { Button } from "@/components/ui/button";

interface OrgProps {
  name: string;
  id: string;
}

export const Organization = ({ name, id }: OrgProps) => {
  const deletOrgById = deletorg.bind(null, id);

  return (
    <form className="flex " action={deletOrgById}>
      <p>org name:{name}</p>
      <Button type="submit" variant={"destructive"}>
        Delete
      </Button>
    </form>
  );
};
