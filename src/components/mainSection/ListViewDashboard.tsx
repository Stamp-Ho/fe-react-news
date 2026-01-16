import { useQuery } from "../../libs/hooks/useQuery";
import { useStore } from "../../libs/hooks/useStore";

import { pressDashboardDataType, unsubscribeTarget } from "../../type/types";
import { SubscribeBtn } from "../common/SubscribeButton";
import AlertModal from "../common/AlertModal";

const ListViewDashBoard = () => {
  const [viewOnlySubs, setVOS] = useStore<boolean>("viewOnlySubs");
  const [currentTabIndex, setCurrentTabIndex] = useStore<number>(
    "currentTabIndex",
    0
  );
  const [pressCount, setPressCount] = useStore<number>("pressCount");

  const { data: categoryData, isLoading: categoryLoading } = useQuery<any[]>(
    "pressLogosByCategory"
  );
  const { data: subscribedPressList } = useQuery<number[]>(
    "subscribedPressList"
  );
  const [currentPressIndex, sCPI] = useStore<number>("currentPressIndex", 0);
  const myIndex =
    subscribedPressList === undefined
      ? 1
      : currentPressIndex % subscribedPressList?.length;
  const { data: dashboardData, isLoading: dashboardDataLoading } =
    useQuery<pressDashboardDataType>(
      `pressDashboard/id=${
        !viewOnlySubs
          ? categoryData?.[currentTabIndex].pressList[pressCount]?.id
          : subscribedPressList?.[myIndex]
      }`
    );

  const [unsubTarget, setUnsubTarget] = useStore<unsubscribeTarget>(
    "unsubscribeTarget",
    { id: null, name: "", isSubscribed: false }
  );

  if (!subscribedPressList || !dashboardData || dashboardDataLoading)
    return <div>Loading!</div>;

  return (
    <div className="border-l border-b border-r border-border-default flex flex-col h-full p-6 gap-4">
      <header className="flex flex-row h-6 gap-4 items-center display-medium12 text-text-default">
        <img className="h-5 w-auto" src={dashboardData.logo} alt="" />
        <span>2026년 {dashboardData.time}</span>
        <SubscribeBtn
          id={subscribedPressList[myIndex]}
          name={dashboardData?.press}
          onWhiteBg={true}
        />
      </header>
      <div className="flex flex-row gap-8 relative">
        {unsubTarget?.id !== null && <AlertModal />}
        <div className="flex flex-col items-start gap-4 cursor-pointer w-80 h-65 group">
          <img
            className="w-80 h-65 transition-transform duration-200 ease-out group-hover:scale-105"
            src={dashboardData.mainImg}
            alt=""
          />
          <a
            className="flex flex-col text-left available-medium16 text-text-strong w-full items-start"
            href=""
          >
            {dashboardData.mainTitle}
          </a>
        </div>

        <div className="flex flex-col gap-4 items-start">
          {dashboardData.relatedArticles.map((article) => (
            <a
              className="text-text-bold available-medium16 hover-underline"
              href={article.link}
            >
              {article.title}
            </a>
          ))}
          <span className="text-text-weak display-medium14">
            {dashboardData.press} 언론사에서 직접 편집한 뉴스입니다.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListViewDashBoard;
