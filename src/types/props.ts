// types
import { Listing, Profile, User } from "../types/models";

/* ---------======= custom props ======--------- */

export interface ListingProps {
  listing: Listing
}

export interface ProfileProps {
  profile: Profile,
  user: User
}


/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
