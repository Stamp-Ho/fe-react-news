import { ListViewIcon, GridViewIcon } from "../../assets/Icons";

type mainHeaderParams = {
  viewOnlySubs: boolean;
  viewGrid: boolean;
  subscribedNum: number;
  setViewOnlySubs: (bool: boolean) => void;
  setViewGrid: (bool: boolean) => void;
};
const MainHeader = ({
  viewOnlySubs = false,
  viewGrid = false,
  subscribedNum = 0,
  setViewOnlySubs = (bool: boolean) => {},
  setViewGrid = (bool: boolean) => {},
}: mainHeaderParams) => {
  const selectedTab = (bool: boolean) => {
    return bool
      ? "selected-bold16 text-text-strong"
      : "available-medium16 text-text-weak";
  };
  const selectedViewType = (bool: boolean) => {
    return bool ? "text-blue-500" : "text-text-weak";
  };
  const badgeStyle = viewOnlySubs
    ? " bg-blue-500 text-text-white-default"
    : "bg-blue-100 text-text-white-weak";
  return (
    <header className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-6">
        <a
          className={`${selectedTab(!viewOnlySubs)}`}
          onClick={() => setViewOnlySubs(false)}
        >
          전체언론사
        </a>
        <a
          className={`gap-1 flex flex-row items-center ${selectedTab(
            viewOnlySubs
          )}`}
          onClick={() => setViewOnlySubs(true)}
        >
          내가 구독한 언론사
          <div
            className={`h-5  w-5 rounded-lg display-medium12 flex items-center justify-center ${badgeStyle}`}
          >
            {subscribedNum}
          </div>
        </a>
      </div>
      <div className="gap-2 flex flex-row items-center">
        <div onClick={() => setViewGrid(false)} className="cursor-pointer">
          <ListViewIcon className={`${selectedViewType(!viewGrid)}`} />
        </div>

        <div onClick={() => setViewGrid(true)} className="cursor-pointer">
          <GridViewIcon className={`${selectedViewType(viewGrid)}`} />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
