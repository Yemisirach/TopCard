
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const organizations = await db.organization.findMany();
      console.log("🚀 ~ handler ~ organizations:", organizations);
      res.status(200).json({ organizations });
    } catch (error) {
      console.error("Error fetching organizations:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await db.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
