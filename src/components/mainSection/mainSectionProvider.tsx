import { useEffect, useState } from "react";
import { pressLogoType, MainSectionContext } from "./mainSectionContext";
import { getPressLogos } from "../../libs/apis/apis";

export const MainSectionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pressLogos, setPressLogos] = useState<pressLogoType>([]);
  const [viewOnlySubs, setViewOnlySubs] = useState(false);
  const [viewGrid, setViewGrid] = useState(true);
  const [subscribedPressList, setSubscribedPressList] = useState<Set<number>>(
    new Set()
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTabIdx, setCurrentTabIdx] = useState(0);

  //   useEffect(() => {
  //     getPressLogos().then((data) => setPressLogos(data));
  //   }, []);

  return (
    <MainSectionContext.Provider
      value={{
        pressLogos,
        setPressLogos,
        viewOnlySubs,
        setViewOnlySubs,
        viewGrid,
        setViewGrid,
        subscribedPressList,
        setSubscribedPressList,
        currentPage,
        setCurrentPage,
        currentTabIdx,
        setCurrentTabIdx,
      }}
    >
      {children}
    </MainSectionContext.Provider>
  );
};
