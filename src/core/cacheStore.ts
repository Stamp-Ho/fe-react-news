type CacheEntry<T = any> = {
  data: T;
  timestamp: number;
};

class CacheStore {
  private cacheMap = new Map<string, CacheEntry>();
  private listeners = new Map<string, Set<() => void>>();
  private defaultStaleTime = 1000 * 60 * 5; // 기본 5분

  // 리액트 컴포넌트가 구독할 수 있게 등록
  subscribe(key: string, listener: () => void) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);

    return () => {
      this.listeners.get(key)?.delete(listener);
    };
  }

  // 상태 변경 알림
  private notify() {
    this.listeners.forEach((listener) => listener.forEach((l) => l()));
  }

  // 데이터 저장
  set(key: string, data: any) {
    this.cacheMap.set(key, {
      data,
      timestamp: Date.now(),
    });
    this.notify();
  }

  // 데이터 단순 조회
  get(key: string) {
    return this.cacheMap.get(key);
  }

  // 데이터가 상했는지 확인
  isStale(key: string, staleTime: number = this.defaultStaleTime) {
    const entry = this.cacheMap.get(key);
    if (!entry) return true;

    const elapsed = Date.now() - entry.timestamp;
    return elapsed > staleTime;
  }

  delete(key: string) {
    this.cacheMap.delete(key);
    this.notify();
  }

  // 캐시 전체 삭제 (로그아웃 등)
  clear() {
    this.cacheMap.clear();
    this.notify();
  }
}

const myStore = new CacheStore();
export default myStore;
