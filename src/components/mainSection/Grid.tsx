import { useEffect, useState } from "react";
import { getPressLogos } from "../../libs/apis/apis";

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
  const [slicedList, setSlicedList] = useState<pressLogoType>([]);

  useEffect(() => {
    if (pressLogos && pressLogos.length > 0) {
      const sliced = pressLogos.slice(currentPage * 24, (currentPage + 1) * 24);
      const tempList = [
        ...sliced,
        ...Array(24 - sliced.length).fill({
          id: null,
          press: null,
          category: null,
          logo: null,
        }),
      ];
      console.log(tempList);

      setSlicedList(tempList);
    }
  }, [currentPage, pressLogos]);

  return (
    <div className="grid grid-cols-6 grid-rows-4 min-w-140 w-full min-h-40">
      {slicedList.map((logo, idx) => (
        <button
          key={logo.id !== null ? "pressTile" + logo.id : "placeholder" + idx}
          className="flex items-center justify-center border border-border-default cursor-pointer -ml-px -mt-px"
        >
          <img src={logo.logo} id={logo.press} />
        </button>
      ))}
    </div>
  );
};

export default Grid;
