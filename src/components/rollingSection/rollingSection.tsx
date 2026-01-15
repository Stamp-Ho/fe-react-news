import { useEffect, useRef, useState } from "react";
import { getRollingNews } from "../../libs/apis/apis";
import { RollingBar } from "./rollingBar";

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
  const [targetToRoll, setTargetToRoll] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getRollingNews();
      setNewsData(data.data);
    };
    getData();
  }, []);

  const rollNext = (index: number) => {
    setTargetToRoll(index); // index에 해당하는 영역 animation 시작
    timerRef.current = window.setTimeout(() => {
      // 인덱스 순환 처리
      if (index === barCount) restartRoll();
      else rollNext(index + 1);
    }, rollGap * 1000);
  };

  let extraDelay = totalDelay - rollGap * (barCount + 1);
  extraDelay = extraDelay < 0 ? 0 : extraDelay;
  //전체 시간(5초) - 영역 개수만큼(2 * 1s) = 3초 기다린 후, 돌리기
  const restartRoll = () => {
    setTargetToRoll(null);
    setTimeout(() => rollNext(0), extraDelay * 1000);
  };

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    // newsData가 채워졌을 때만 시작
    if (newsData.length > 0) {
      //일단 5초 기다리고 롤링 시작
      timerRef.current = window.setTimeout(() => {
        rollNext(0);
      }, totalDelay * 1000);
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
          isActive={targetToRoll === idx}
        />
      ))}
    </section>
  );
}
