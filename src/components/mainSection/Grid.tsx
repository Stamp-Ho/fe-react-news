import { useEffect, useState } from "react";
import PressLogoTile from "./PressLogoTile";
import { useStore } from "../../libs/hooks/useStore";
import { useQuery } from "../../libs/hooks/useQuery";
import { pressLogoType, unsubscribeTarget } from "../../type/types";
import { PageNext, PagePrev } from "../common/Icons";
import AlertModal from "../common/AlertModal";

const Grid = () => {
  // 서버 상태
  const [viewOnlySubs, setViewOnlySubs] = useStore<boolean>("viewOnlySubs");
  const { data: pressLogos, isLoading: loadingLogos } =
    useQuery<pressLogoType[]>("pressLogos");
  const { data: subscribedPressList, isLoading: loadingSubscribedPressList } =
    useQuery<number[]>("subscribedPressList");
  const [viewGrid, setViewGrid] = useStore<boolean>("viewGrid", true);

  // 클라이언트 상태
  const [slicedList, setSlicedList] = useState<pressLogoType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [unsubTarget, setUnsubTarget] = useStore<unsubscribeTarget>(
    "unsubscribeTarget",
    { id: null, name: "", isSubscribed: false }
  );

  if (loadingSubscribedPressList || loadingLogos) return <div>loading...</div>;
  if (!pressLogos || !subscribedPressList) return <div>loading...</div>;

  useEffect(() => {
    if (pressLogos && pressLogos.length > 0) {
      let sliced: any[] = [];
      if (viewOnlySubs) {
        sliced = pressLogos.filter((press) =>
          subscribedPressList?.includes(press.id)
        );
      } else {
        sliced = pressLogos.slice(currentPage * 24, (currentPage + 1) * 24);
      }
      const tempList: pressLogoType[] = [
        ...sliced,
        ...Array(24 - sliced.length).fill({
          id: null,
          press: null,
          category: null,
          logo: null,
        }),
      ];

      setSlicedList(tempList);
    }
  }, [currentPage, pressLogos, viewOnlySubs, subscribedPressList]);

  useEffect(() => {
    setCurrentPage(0);
  }, [viewOnlySubs]);

  const onPagePrev = () => setCurrentPage(currentPage - 1);
  const onPageNext = () => setCurrentPage(currentPage + 1);

  const hidePagePrev = (): boolean => {
    const result = viewGrid ? currentPage === 0 : false;
    return result;
  };
  const hidePageNext = (): boolean => {
    const result = viewGrid
      ? viewOnlySubs
        ? currentPage >= Math.floor(subscribedPressList.length / 24)
        : currentPage >= Math.floor(pressLogos.length / 24)
      : false;
    return result;
  };

  return (
    <div className="relative">
      <div
        className={`absolute -left-16 top-1/2 -translate-y-1/2 cursor-pointer ${
          hidePagePrev() && "hidden"
        }`}
        onClick={onPagePrev}
      >
        <PagePrev />
      </div>
      <div className="grid grid-cols-6 grid-rows-4 min-w-140 w-full min-h-97">
        {unsubTarget?.id !== null && <AlertModal />}
        {slicedList.map((logo, idx) => (
          <PressLogoTile
            key={logo.id !== null ? "pressTile" + logo.id : "placeholder" + idx}
            logo={logo}
            index={idx}
          />
        ))}
      </div>
      <div
        className={`absolute -right-16 top-1/2 -translate-y-1/2 cursor-pointer ${
          hidePageNext() && "hidden"
        }`}
        onClick={onPageNext}
      >
        <PageNext />
      </div>
    </div>
  );
};

export default Grid;
