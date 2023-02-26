/* ---------==== custom forms ====--------- */



/* ---------===== auth forms =====--------- */

export interface ListingFormData {
  itemName: string;
  photos: string[];
  description: string;
  condition: string;
  openToTrade: boolean;
  price: number;
  type: string;
  sold: boolean;
}

export interface MarkAsSold {
  sold: boolean
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  userName: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
