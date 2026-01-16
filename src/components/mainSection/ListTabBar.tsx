import { useEffect, useState } from "react";
import { useQuery } from "../../libs/hooks/useQuery";
import { useStore } from "../../libs/hooks/useStore";

import { pressLogoType } from "../../type/types";
import { RightIcon } from "../common/Icons";

const ListTabBar = () => {
  const { data: subscribedPressList } = useQuery<number[]>(
    "subscribedPressList"
  );
  const { data: pressLogos } = useQuery<pressLogoType[]>("pressLogos");
  const { data: categoryData, isLoading: categoryLoading } = useQuery<any[]>(
    "pressLogosByCategory"
  );
  const [currentPressIndex, setCurrentPressIndex] = useStore<number>(
    "currentPressIndex",
    0
  );
  const [currentTabIndex, setCurrentTabIndex] = useStore<number>(
    "currentTabIndex",
    0
  );
  const [viewOnlySubs, setVOS] = useStore<boolean>("viewOnlySubs");

  const [pressCount, setPressCount] = useStore<number>("pressCount");

  const [categoryIndexArray, setCategoryIndexArray] = useStore<number[]>(
    "categoryIndexArray",
    []
  );

  useEffect(() => {
    if (categoryData !== undefined && categoryData?.length > 0) {
      setCategoryIndexArray(categoryData.map((e) => e.pressList.length));
      if (pressCount < 0) {
        setCurrentTabIndex(currentTabIndex - 1);
        setPressCount(categoryIndexArray[currentTabIndex - 1] - 1);
      } else if (pressCount > categoryIndexArray[currentTabIndex] - 1) {
        setCurrentTabIndex(currentTabIndex + 1);
        setPressCount(0);
      }
    }
  }, [pressCount]);

  if (!subscribedPressList || !pressLogos || !categoryData)
    return <div>Loading!</div>;

  const tabStyle = (bool: boolean) => {
    return bool
      ? "bg-blue-100 text-text-white-default selected-bold14"
      : "available-medium14";
  };

  return (
    <div className="border border-border-default flex flex-row bg-surface-alt h-10 overflow-x-hidden items-center">
      {viewOnlySubs
        ? subscribedPressList.map((pressId, index) => {
            const press = pressLogos.find((p) => p.id === pressId);

            return (
              <div
                className={`flex items-center h-full px-4 cursor-pointer white-space-nowrap relative  text-text-weak ${tabStyle(
                  index === currentPressIndex
                )}`}
                key={pressId}
                onClick={() => {
                  setCurrentPressIndex(index);
                }}
              >
                {press?.press ?? "알 수 없음"}
                {index === currentPressIndex && (
                  <RightIcon className="h-3.5 w-3.5 ml-8" />
                )}
              </div>
            );
          })
        : categoryData.map((category, index) => (
            <div
              className={`flex items-center h-full px-4 cursor-pointer white-space-nowrap relative  text-text-weak ${tabStyle(
                index === currentTabIndex
              )}`}
              key={"tab" + index}
              onClick={() => {
                setCurrentTabIndex(index);
                let cnt = 0;
                for (let i = 0; i < categoryData.length; i++) {
                  if (i === index) break;
                  cnt += categoryData[i].pressList.length;
                }
                setCurrentPressIndex(cnt);
                setPressCount(0);
              }}
            >
              {category?.category ?? "알 수 없음"}
              {index === currentTabIndex && (
                <span>
                  {pressCount + 1}/{category.pressList.length}
                </span>
              )}
            </div>
          ))}
    </div>
  );
};

export default ListTabBar;
