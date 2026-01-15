import { useSyncExternalStore, useEffect, useCallback } from "react";
import myStore from "../../core/cacheStore";
import { apiClient } from "../../core/apiClient";

//서버 상태 관리
export function useQuery<T>(key: string, staleTime: number = 1000 * 60) {
  // 1. Store의 상태를 리액트와 동기화 (최신 데이터 구독)
  const cache = useSyncExternalStore(
    (onStoreChange) => myStore.subscribe(key, onStoreChange),
    () => myStore.get(key)
  );

  const fetchData = useCallback(async () => {
    try {
      // 로딩 상태 처리 등은 생략하고 핵심 로직만 기술
      const data = await apiClient(key);
      myStore.set(key, data);
    } catch (error) {
      console.error("Fetch failed:", error);
      // 여기서 필요하다면 Store에 에러 상태를 set 할 수 있습니다.
    }
  }, [key]);

  // 2. 마운트 시 혹은 key 변경 시 캐시 상태 확인
  useEffect(() => {
    const isStale = myStore.isStale(key, staleTime);

    // 데이터가 없거나(undefined) 상했으면(stale) 호출
    if (!cache || isStale) {
      fetchData();
    }
  }, [key, staleTime, cache, fetchData]);

  return {
    data: cache?.data as T | undefined,
    isLoading: !cache?.data,
  };
}
