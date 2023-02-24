// types
import { Listing } from "../types/models";

/* ---------======= custom props ======--------- */

export interface ListingProps {
  listing: Listing
}


/* ---------===== auth form props =====--------- */

export interface AuthFormProps {
  handleAuthEvt: () => void;
  updateMessage: (msg: string) => void;
}
