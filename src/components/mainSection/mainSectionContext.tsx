import { createContext } from "react";

export type pressLogoType = {
  id: number;
  press: string;
  category: string;
  logo: string;
}[];

type MainSectionContextType = {
  pressLogos: pressLogoType;
  setPressLogos: React.Dispatch<React.SetStateAction<pressLogoType>>;
  viewOnlySubs: boolean;
  setViewOnlySubs: React.Dispatch<React.SetStateAction<boolean>>;
  viewGrid: boolean;
  setViewGrid: React.Dispatch<React.SetStateAction<boolean>>;
  subscribedPressList: Set<number>;
  setSubscribedPressList: React.Dispatch<React.SetStateAction<Set<number>>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentTabIdx: number;
  setCurrentTabIdx: React.Dispatch<React.SetStateAction<number>>;
};

export const MainSectionContext = createContext<MainSectionContextType | null>(
  null
);
