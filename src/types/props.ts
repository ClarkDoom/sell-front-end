// types
import { Listing, Profile, User } from "../types/models";

/* ---------======= custom props ======--------- */

export interface CreateListingProps {
  profileId: number | undefined
}

export interface ShowListingProps {
  loggedInUser: number | undefined
}

export interface ListingProps {
  listing: Listing
}

export interface ProfileProps {
  // profile: Profile,
  user: User | null,
  handleLogout: () => void;
}

export interface EditListingProps {
  listing: Listing
}

/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
