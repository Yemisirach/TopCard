import { Card, List } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };

import { UserRole } from "@prisma/client";

type User = {
  id: string;
  email: string;
  role: UserRole[];
  name: string;
  image: string | null;
  emailVerified: Date | null;
  isOAuth:boolean;

};

export default User;
