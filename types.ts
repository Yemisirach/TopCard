import { Card, List, Organization } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type ORGANIZATION = Organization & { Organization: Organization[] };

export type CardWithList = Card & { list: List };

import { Session } from "next-auth";

// Extend the default Session type
interface CustomSession extends Session {
  auth: {
    // Define any additional properties you have in your 'auth' object
    // For example:
    userRole: string;
  };
}

export type { CustomSession };
