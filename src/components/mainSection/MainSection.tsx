import { useEffect, useState, useContext } from "react";
import { PageNext, PagePrev } from "../common/Icons";
import { getPressLogos } from "../../libs/apis/apis";
import Grid from "./Grid";
import MainHeader from "./MainHeader";
import List from "./List";
import { MainSectionContextProvider } from "./mainSectionProvider";
import { MainSectionContext } from "./mainSectionContext";

type pressLogoType = {
  id: number;
  press: string;
  category: string;
  logo: string;
}[];

const MainSection = () => {
  // const [pressLogos, setPressLogos] = useState<pressLogoType>([]);
  // const [viewOnlySubs, setViewOnlySubs] = useState<boolean>(false);
  // const [viewGrid, setViewGrid] = useState<boolean>(true);
  // const [subscribedPressList, setSubscribedPressList] = useState<any[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(0);
  // const [currentTabIdx, setCurrentTabIdx] = useState<number>(0); //List뷰에서 사용

  const context = useContext(MainSectionContext);
  if (!context) return null;
  const {
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
  } = context;

  useEffect(() => {
    const getData = async () => {
      const data = await getPressLogos();
      setPressLogos(data);
    };
    getData();
  }, []);

  const onPagePrev = () => setCurrentPage((prev) => prev - 1);
  const onPageNext = () => setCurrentPage((prev) => prev + 1);

  const hidePagePrev = (): boolean => {
    const result = viewGrid ? currentPage === 0 : false;
    return result;
  };
  const hidePageNext = (): boolean => {
    const result = viewGrid
      ? viewOnlySubs
        ? false
        : currentPage >= Math.floor(pressLogos.length / 24)
      : false;
    return result;
  };
  return (
    <section className="flex flex-col gap-3">
      <MainHeader
        viewOnlySubs={viewOnlySubs}
        viewGrid={viewGrid}
        subscribedNum={Array.from(subscribedPressList).length}
        setViewOnlySubs={setViewOnlySubs}
        setViewGrid={setViewGrid}
      />

      <div className="relative">
        <div
          className={`absolute -left-16 top-1/2 -translate-y-1/2 cursor-pointer ${
            hidePagePrev() && "hidden"
          }`}
          onClick={onPagePrev}
        >
          <PagePrev />
        </div>
        {viewGrid ? (
          <Grid currentPage={currentPage} pressLogos={pressLogos} />
        ) : (
          <List />
        )}
        <div
          className={`absolute -right-16 top-1/2 -translate-y-1/2 cursor-pointer ${
            hidePageNext() && "hidden"
          }`}
          onClick={onPageNext}
        >
          <PageNext />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
