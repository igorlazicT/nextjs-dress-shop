import { User, Wishlist } from "@prisma/client";

/* Shared */
export interface DefaultResponse {
  error?: boolean;
  message: string | string[];
  data?: unknown;
}

export type UserType = Partial<User> & {
  wishlist: Wishlist[] | never[];
};