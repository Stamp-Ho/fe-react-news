import "./App.css";
import {
  Logo,
  ListViewIcon,
  GridViewIcon,
  PageNext,
  PagePrev,
} from "./assets/Icons";

function App() {
  const today = new Date();

  // 자동 포맷 설정
  const dateString = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full", // "2025년 12월 30일 화요일" 형식 출력
  })
    .format(today)
    .replace(/년 |월 /g, ". ") // "년", "월"을 "."으로 치환
    .replace("일", "."); // "일"을 "."으로 치환

  return (
    <div className="flex flex-col items-stretch gap-3 px-20">
      <header className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Logo className="text-blue-500" />
          <div className="display-bold24 text-text-strong">뉴스스탠드</div>
        </div>
        <div className="display-medium16 text-text-default">{dateString}</div>
      </header>
      <section className="flex flex-row gap-1 min-w-140">
        <article className="flex h-12.25 flex-row items-center flex-1 border border-border-default bg-surface-alt">
          <div className="px-4 h-6 overflow-hidden flex-1">
            <ul>
              <li className="flex flex-row gap-4 items-center">
                <a className="display-bold14 text-text-strong">언론사</a>
                <a className="available-medium14">기사제목</a>
              </li>
              {/** 두번째 기사 들어갈 예정 */}
            </ul>
          </div>
        </article>
        <article className="flex h-12.25 flex-row items-center flex-1 border border-border-default bg-surface-alt">
          <div className="px-4 h-6 overflow-hidden flex-1">
            <ul>
              <li className="flex flex-row gap-4 items-center">
                <a className="display-bold14 text-text-strong">언론사</a>
                <a className="available-medium14">기사제목</a>
              </li>
              {/** 두번째 기사 들어갈 예정 */}
            </ul>
          </div>
        </article>
      </section>
      <section className="flex flex-col gap-3">
        <header className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-6">
            <a href="">전체언론사</a>
            <a href="" className="gap-1 flex flex-row items-center">
              내가 구독한 언론사
              <div
                className="h-5 bg-blue-100 w-5 rounded-lg display-medium12 flex items-center justify-center
              text-text-white-weak"
              >
                0
              </div>
            </a>
          </div>
          <div className="gap-2 flex flex-row items-center">
            <ListViewIcon
              className={`${true ? `text-blue-500` : "text-text-weak"}`}
            />
            <GridViewIcon
              className={`${false ? `text-blue-500` : "text-text-weak"}`}
            />
          </div>
        </header>

        <div className="relative">
          <PagePrev className="absolute -left-16 top-1/2 -translate-y-1/2 cursor-pointer" />
          <div className="grid grid-cols-6 grid-rows-4 min-w-140 w-full min-h-40">
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
            <button className="flex items-center justify-center border border-border-default cursor-pointer bg-red-400">
              button
            </button>
          </div>
          <PageNext className="absolute -right-16 top-1/2 -translate-y-1/2 cursor-pointer" />
        </div>
      </section>
    </div>
  );
}

export default App;
