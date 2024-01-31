import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  console.log("🚀 ~ currentRole ~ session:", session)
// @ts-ignore
  return session?.user?.role;
};
