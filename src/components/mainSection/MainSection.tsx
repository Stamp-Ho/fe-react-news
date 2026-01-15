import Grid from "./Grid";
import MainHeader from "./MainHeader";
import List from "./List";
import { pressLogoType } from "../../type/types";
import { useStore } from "../../libs/hooks/useStore";
import { useQuery } from "../../libs/hooks/useQuery";

const MainSection = () => {
  // 임시로 상태 저장중 > 전역 상태로 뺄것

  //서버 상태
  const { data: pressLogos, isLoading: loadingLogos } =
    useQuery<pressLogoType[]>("pressLogos");
  const { data: subscribedPressList, isLoading: loadingSubscribedPressList } =
    useQuery<number[]>("subscribedPressList");

  //클라이언트 상태
  const [viewOnlySubs, setViewOnlySubs] = useStore<boolean>(
    "viewOnlySubs",
    false
  );
  const [viewGrid, setViewGrid] = useStore<boolean>("viewGrid", true);
  const [currentTabIdx, setCurrentTabIdx] = useStore<number>(
    "currentTabIdx",
    0
  ); //List뷰에서 사용

  if (loadingLogos || loadingSubscribedPressList) return <div>Loading...</div>;
  if (!pressLogos || !subscribedPressList) return <div>데이터 없음! 에러!</div>;

  return (
    <section className="flex flex-col gap-3">
      <MainHeader subscribedNum={Array.from(subscribedPressList).length} />

      {viewGrid ? <Grid /> : <List />}
    </section>
  );
};

export default MainSection;
