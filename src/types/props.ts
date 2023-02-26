// types
import { Listing, Profile, User } from "../types/models";

/* ---------======= custom props ======--------- */

export interface CreateListingProps {
  profileId: number
}

export interface ShowListingProps {
  loggedInUser: number
}

export interface ListingProps {
  listing: Listing
}

export interface ProfileProps {
  profile: Profile,
}
export interface UserProps {
  user: User | null
}
export interface EditListingProps {
  listing: Listing
}

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
