// 가상의 외부 API 함수들이 정의되어 있다고 가정합니다.
import {
  fetchRollingNews,
  fetchPressLogo,
  fetchDashboardData,
} from "../../mockServer/mockServer";

/**
 * 헤드라인 롤링 뉴스 가져오기
 */
export const getRollingNews = async () => {
  try {
    const data = await fetchRollingNews();
    // 필요 시 추가적인 비즈니스 로직 처리 (예: 데이터 유효성 검사)
    return data;
  } catch (error) {
    console.error("헤드라인 뉴스를 불러오는 데 실패했습니다.");
    return []; // 에러 시 빈 배열 반환으로 서비스 중단 방지
  }
};

/**
 * 그리드 뷰용 언론사 로고 목록 가져오기
 * 전체 언론사 로고를 가져와서 랜덤하게 섞어서 보여줌
 */
export const getPressLogos = async () => {
  try {
    const logos = await fetchPressLogo();
    // 전체 언론사를 그리드에 뿌려주기 위해 그대로 반환
    return logos;
  } catch (error) {
    console.error("언론사 목록을 불러오는 데 실패했습니다.");
    throw error;
  }
};

/**
 * 리스트 뷰용 상세 대시보드 데이터 가져오기
 * 특정 언론사의 ID를 받아 상세 기사(메인 + 관련 기사)를 가져옴
 */
export const getPressDashboard = async (pressId: number) => {
  try {
    const dashboardData = await fetchDashboardData(pressId);
    if (!dashboardData) {
      throw new Error("해당 언론사의 상세 데이터가 없습니다.");
    }
    return dashboardData;
  } catch (error) {
    console.error(
      `ID ${pressId}번 언론사 데이터를 가져오는 중 오류 발생:`,
      error
    );
    return null;
  }
};

/**
 * [유틸리티] 특정 카테고리별 언론사 필터링
 * API에서 전체를 가져온 뒤, 클라이언트 사이드에서 카테고리별로 분류
 */
export const getPressLogosByCategory = async (category: string) => {
  try {
    const allLogos = await fetchPressLogo();
    return allLogos.filter((item) => item.category === category);
  } catch (error) {
    return [];
  }
};
