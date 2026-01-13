import { forwardRef, useImperativeHandle, useState, useRef } from "react";

export interface RollingBarHandle {
  roll: () => void;
}
export const RollingBar = forwardRef<RollingBarHandle, { newsList: any[] }>(
  ({ newsList }, ref) => {
    const [newsIdx, setNewsIdx] = useState(0);

    let isMouseOn = false;
    const listRef = useRef<HTMLUListElement | null>(null);
    const animRef = useRef<number | null>(null);
    const yRef = useRef(0);

    const rollNews = (el: HTMLUListElement) => {
      const duration = 500;
      const start: number = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-in-out
        const eased =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const y = -eased * 50;
        yRef.current = y;

        el.style.transform = `translateY(${y}%)`;

        if (progress < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          initTransition(el);
          requestAnimationFrame(() => {
            alterNews(el);
          });
        }
      };

      animRef.current = requestAnimationFrame(animate);
    };

    const rollNewsOnlyCss = (el: HTMLUListElement) => {
      el.style.transition = "transform 0.5s ease-in-out";
      el.style.transform = `translateY(-50%)`;
      setTimeout(() => {
        initTransition(el);
        alterNews(el);
      }, 500);
    };

    const initTransition = (el: HTMLUListElement) => {
      el.style.transition = "none";
      el.style.transform = "translateY(0)";
    };

    const alterNews = (el: HTMLUListElement) => {
      const nextIndex = (newsIdx + 1) % newsList.length;
      setNewsIdx(nextIndex);
    };

    useImperativeHandle(ref, () => ({
      async roll() {
        const el = listRef.current;
        if (!el || isMouseOn) return;

        rollNewsOnlyCss(el);
        //rollNews(el);
      },
    }));
    if (!newsList || newsList.length === 0)
      return <article className="flex-1" />;
    return (
      <article
        className="flex h-12.25 flex-row items-center flex-1 border border-border-default bg-surface-alt overflow-x-hidden"
        onMouseEnter={() => (isMouseOn = true)}
        onMouseLeave={() => (isMouseOn = false)}
      >
        <div className="px-4 h-6 overflow-hidden flex-1 min-w-0">
          <ul className="min-w-0" ref={listRef}>
            <RollingNews news={newsList[newsIdx]} />
            <RollingNews news={newsList[(newsIdx + 1) % newsList.length]} />
          </ul>
        </div>
      </article>
    );
  }
);

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
