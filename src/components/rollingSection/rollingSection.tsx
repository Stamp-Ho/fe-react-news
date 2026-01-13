import { useEffect, useRef, useState } from "react";
import { getRollingNews } from "../../libs/apis/apis";
import { RollingBar, RollingBarHandle } from "./rollingBar";

type RollingSectionProps = {
  barCount: number;
  newsCountPerBar: number;
  totalDelay: number;
  rollGap: number;
};

export default function RollingSection({
  barCount = 2,
  newsCountPerBar = 5,
  totalDelay = 5,
  rollGap = 1,
}: RollingSectionProps) {
  const [newsData, setNewsData] = useState<any>([]);

  const barRefs = useRef<(RollingBarHandle | null)[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getRollingNews();
      setNewsData(data);
    };
    getData();
  }, []);

  const timerRef = useRef<number | null>(null);

  const rollNext = (index: number) => {
    // 인덱스 순환 처리
    if (index >= barRefs.current.length) {
      let extraDelay = totalDelay - rollGap * barCount;
      extraDelay = extraDelay < 0 ? 0 : extraDelay;
      setTimeout(() => rollNext(0), extraDelay * 1000);
    } else
      timerRef.current = window.setTimeout(() => {
        barRefs.current[index]?.roll();
        rollNext(index + 1);
      }, rollGap * 1000);
  };

  useEffect(() => {
    // newsData가 채워졌을 때만 시작
    if (newsData.length > 0) {
      rollNext(0);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null; // ID 초기화
        console.log("루프 완전히 중단됨");
      }
    };
  }, [newsData]);
  return (
    <section className="flex flex-row gap-1 min-w-140">
      {Array.from({ length: barCount }).map((_, idx) => (
        <RollingBar
          key={`rollingBar_${idx}`}
          newsList={newsData.slice(
            idx * newsCountPerBar,
            (idx + 1) * newsCountPerBar
          )}
          ref={(el) => {
            barRefs.current[idx] = el;
          }}
        />
      ))}
    </section>
  );
}
