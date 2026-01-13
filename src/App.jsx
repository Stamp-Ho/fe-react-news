import "./App.css";
import {
  Logo,
  ListViewIcon,
  GridViewIcon,
  PageNext,
  PagePrev,
} from "./assets/Icons";
import RollingSection from "./components/rollingSection/rollingSection";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="flex flex-col items-stretch gap-3 px-20">
      <Header />
      <RollingSection
        barCount={3}
        newsCountPerBar={5}
        totalDelay={5}
        rollGap={1}
      />
      <section className="flex flex-col gap-3">
        <header className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-6">
            <a>전체언론사</a>
            <a className="gap-1 flex flex-row items-center">
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
              className={`${false ? `text-blue-500` : "text-text-weak"}`}
            />
            <GridViewIcon
              className={`${true ? `text-blue-500` : "text-text-weak"}`}
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
