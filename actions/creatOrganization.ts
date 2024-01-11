// "use server";

// import * as z from "zod";

// import { db } from "@/lib/db";
// import { OrgSchema } from "@/schemas";

// export const register = async (values: z.infer<typeof OrgSchema>) => {
//   const validatedFields = OrgSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid fields!" };
//   }

//   const { orgname, role, Image } = validatedFields.data;

//   await db.user.create({
//     data: {
//       orgname,
//       role,
//       image: Image,
//     },
//   });

//   return { success: "Confirmation email sent!" };
// };
