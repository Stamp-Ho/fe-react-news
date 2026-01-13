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
