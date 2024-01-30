import { db } from "@/lib/db";

export async function getServerSideProps() {

    try {
      const organizations = await db.organization.findMany();
  
      return {
        props: {
          organizations,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
          organizations: [],
        },
      };
    } finally {
      await db.$disconnect();
    }
  }