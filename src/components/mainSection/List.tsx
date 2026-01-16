import { useStore } from "../../libs/hooks/useStore";
import { PageNext, PagePrev } from "../common/Icons";
import ListTabBar from "./ListTabBar";
import ListViewDashBoard from "./ListViewDashboard";

const List = () => {
  const [pressCount, setPressCount] = useStore<number>("pressCount", 0);
  const [currentPressIndex, setCurrentPressIndex] = useStore<number>(
    "currentPressIndex",
    0
  );
  const onPagePrev = () => {
    setPressCount(pressCount - 1);
    setCurrentPressIndex(currentPressIndex - 1);
  };
  const onPageNext = () => {
    setPressCount(pressCount + 1);
    setCurrentPressIndex(currentPressIndex + 1);
  };
  return (
    <div className="relative">
      <div
        className={`absolute -left-16 top-1/2 -translate-y-1/2 cursor-pointer`}
        onClick={onPagePrev}
      >
        <PagePrev />
      </div>
      <ListTabBar />
      <ListViewDashBoard />
      <div
        className={`absolute -right-16 top-1/2 -translate-y-1/2 cursor-pointer`}
        onClick={onPageNext}
      >
        <PageNext />
      </div>
    </div>
  );
};

export default List;
