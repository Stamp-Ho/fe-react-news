import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>
        <div>
          <svg />
          <a>뉴스스탠드</a>
        </div>
        <div>날짜</div>
      </header>
      <section>
        <article>
          <ul>
            <li>
              <a>언론사</a>
              <a>기사제목</a>
            </li>
            <li>
              <a>언론사</a>
              <a>기사제목</a>
            </li>
          </ul>
        </article>
      </section>
      <section>
        <header>
          <div>
            <a href="">전체언론사</a>
            <a href="">
              내가 구독한 언론사<span>0</span>
            </a>
          </div>
          <div>
            <svg />
            <svg />
          </div>
        </header>

        <div>
          <svg /> {/* 왼쪽 페이지 */}
          <div>
            <button>button</button>
          </div>
          <svg /> {/* 오른쪽 페이지 */}
        </div>
      </section>
    </>
  );
}

export default App;
