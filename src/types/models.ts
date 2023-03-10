export interface Listing {
  id: number;
  itemName: string;
  photos?: string[]
  description: string;
  condition: string;
  openToTrade: boolean;
  price: number;
  profileId: { id: number};
  type: string,
  sold: boolean
}

export interface Profile {
  name: string;
  userName: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  listings: Listing[],
  email: string
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}

