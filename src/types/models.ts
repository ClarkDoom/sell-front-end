/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Listing {
  id: number;
  itemName: string;
  photos: string[];
  description: string;
  condition: string;
  openToTrade: boolean;
  price: number;
  profileId: { id: number};
}

export interface Profile {
  name: string;
  userName: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}

