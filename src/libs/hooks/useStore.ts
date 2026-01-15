import { useSyncExternalStore, useEffect } from "react";
import myStore from "../../core/cacheStore";

export function useStore<T>(key: string, defaultValue?: T) {
  const state = useSyncExternalStore(
    (onStoreChange) => myStore.subscribe(key, onStoreChange),
    () => {
      const rawValue = myStore.get(key); // { data, timestamp } 반환

      // 1️⃣ 데이터가 있으면 알맹이(.data)만 추출, 없으면 초기값 반환
      if (rawValue !== undefined) return rawValue.data;
      return defaultValue;
    }
  );

  // 초기값이 스토어에도 영구적으로 저장되길 원한다면 effect는 유지하거나
  // 혹은 getSnapshot 시점에 set을 호출할 수 있습니다.
  useEffect(() => {
    if (myStore.get(key) === undefined && defaultValue !== undefined) {
      myStore.set(key, defaultValue);
    }
  }, [key, defaultValue]);

  const setState = (newData: T) => myStore.set(key, newData);

  return [state as T, setState] as const;
}
