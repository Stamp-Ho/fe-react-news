import { useState, useRef, useEffect } from "react";

type rollingBarParams = {
  newsList: any[];
  isActive: boolean;
};

export const RollingBar = ({ newsList, isActive }: rollingBarParams) => {
  const [newsIdx, setNewsIdx] = useState(0);

  let isMouseOn = useRef(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  const initTransition = (el: HTMLUListElement) => {
    el.style.transition = "none";
    el.style.transform = "translateY(0)";
  };

  const alterNews = (el: HTMLUListElement) => {
    const nextIndex = (newsIdx + 1) % newsList.length;
    setNewsIdx(nextIndex);
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el || !isActive || isMouseOn.current) return;

    el.style.transition = "transform 0.5s ease-in-out";
    el.style.transform = `translateY(-50%)`;
    const timer = setTimeout(() => {
      initTransition(el);
      alterNews(el);
    }, 500);
    return () => clearTimeout(timer);
  }, [isActive]);
  if (!newsList || newsList.length === 0) return <article className="flex-1" />;
  return (
    <article
      className="flex h-12.25 flex-row items-center flex-1 border border-border-default bg-surface-alt overflow-x-hidden"
      onMouseEnter={() => (isMouseOn.current = true)}
      onMouseLeave={() => (isMouseOn.current = false)}
    >
      <div className="px-4 h-6 overflow-hidden flex-1 min-w-0">
        <ul className="min-w-0" ref={listRef}>
          <RollingNews news={newsList[newsIdx]} />
          <RollingNews news={newsList[(newsIdx + 1) % newsList.length]} />
        </ul>
      </div>
    </article>
  );
};

type RollingNewsParams = {
  news: {
    pressName: string;
    newsTitle: string;
    link: string;
  };
};
function RollingNews({ news }: RollingNewsParams) {
  return (
    <li className="flex flex-row gap-4 items-center ">
      <a className="display-bold14 text-text-strong whitespace-nowrap">
        {news.pressName}
      </a>
      <a className="available-medium14 whitespace-nowrap" href={news.link}>
        {news.newsTitle}
      </a>
    </li>
  );
}
