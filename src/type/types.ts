export type pressLogoType = {
  id: number;
  press: string;
  category: string;
  logo: string;
};

export type unsubscribeTarget = {
  id: number | null;
  name: string;
  isSubscribed: boolean;
};
