import "./App.css";
import { ListViewIcon, GridViewIcon, PageNext, PagePrev } from "./assets/Icons";
import RollingSection from "./components/rollingSection/rollingSection";
import Header from "./components/header/Header";
import MainSection from "./components/mainSection/MainSection";

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
      <MainSection />
    </div>
  );
}

export default App;
