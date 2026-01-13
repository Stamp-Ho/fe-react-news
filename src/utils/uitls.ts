export function createShuffleQueue(list: any[]) {
  let pool = shuffle(list);

  return {
    next() {
      if (pool.length === 0) {
        pool = shuffle(list);
      }
      return pool.shift();
    },
  };
}

function shuffle(array: any[]) {
  const arr = [...array]; // 원본 보호

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export const formattedDate = () => {
  const today = new Date();

  // 자동 포맷 설정
  const dateString = new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "full", // "2025년 12월 30일 화요일" 형식 출력
  })
    .format(today)
    .replace(/년 |월 /g, ". ") // "년", "월"을 "."으로 치환
    .replace("일", "."); // "일"을 "."으로 치환
  return dateString;
};
