// 사용 예시: 다크모드 설정 및 탭 전환
import { useStore } from "../../hooks/useStore";

function ThemeButton() {
  // 'theme'이라는 키로 전역 상태를 구독
  const [theme, setTheme] = useStore("theme");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return <button onClick={toggleTheme}>현재 모드: {theme ?? "light"}</button>;
}

function TabNavigation() {
  const [activeTab, setActiveTab] = useStore("currentTab");

  return (
    <nav>
      <button onClick={() => setActiveTab("all")}>전체 언론사</button>
      <button onClick={() => setActiveTab("subscribed")}>
        내가 구독한 언론사
      </button>
    </nav>
  );
}

// 사용 예시: 언론사 목록 및 상세 데이터 조회
import { useQuery } from "../../hooks/useQuery";

function PressGrid() {
  // 'press-logos' 키로 API 데이터를 가져옴 (60분간 캐시 유지)
  const { data: logos, isLoading } = useQuery<PressData>(
    "pressDashboard/id=14",
    1000 * 60 * 5
  );

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div className="grid">
      {logos?.map((logo) => (
        <img key={logo.id} src={logo.url} alt={logo.name} />
      ))}
    </div>
  );
}

function RollingNews() {
  // 뉴스 헤드라인은 자주 바뀌어야 하므로 staleTime을 짧게(1분) 설정
  const { data: news } = useQuery("rolling-news", 1000 * 60);

  return <div className="rolling-bar">{news?.[0]?.title}</div>;
}
