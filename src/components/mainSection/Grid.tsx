import { useContext, useEffect, useState } from "react";
import { getPressLogos } from "../../libs/apis/apis";
import { SubscribeBtn } from "../common/SubscribeButton";
import PressLogoTile from "./PressLogoTile";
import { MainSectionContext } from "./mainSectionContext";

type pressLogoType = {
  id: number;
  press: string;
  category: string;
  logo: string;
}[];

type gridProps = {
  currentPage: number;
  pressLogos: pressLogoType;
};

const Grid = ({ currentPage, pressLogos }: gridProps) => {
  const context = useContext(MainSectionContext);
  if (!context) return <div>loading...</div>;

  const { subscribedPressList, viewOnlySubs } = context;

  const [slicedList, setSlicedList] = useState<pressLogoType>([]);

  useEffect(() => {
    if (pressLogos && pressLogos.length > 0) {
      let sliced: any[] = [];
      if (viewOnlySubs) {
        sliced = pressLogos.filter((press) =>
          subscribedPressList.has(press.id)
        );
      } else {
        sliced = pressLogos.slice(currentPage * 24, (currentPage + 1) * 24);
      }
      const tempList = [
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

  return (
    <div className="grid grid-cols-6 grid-rows-4 min-w-140 w-full min-h-97">
      {slicedList.map((logo, idx) => (
        <PressLogoTile logo={logo} index={idx} />
      ))}
    </div>
  );
};

export default Grid;
