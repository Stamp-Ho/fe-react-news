// 가상의 외부 API 함수들이 정의되어 있다고 가정합니다.
import {
  fetchRollingNews,
  fetchPressLogo,
  fetchDashboardData,
} from "../../mockServer/mockServer";
import { pressLogoType } from "../../type/types";

export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  message: string;
  data: T | null;
}
/**
 * 롤링 뉴스 가져오기
 */
export const getRollingNews = async (): Promise<ApiResponse<any[]>> => {
  try {
    const data = await fetchRollingNews();
    return {
      ok: true,
      status: 200,
      message: "헤드라인 뉴스를 성공적으로 불러왔습니다.",
      data: data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: "헤드라인 뉴스를 불러오는 데 실패했습니다.",
      data: [],
    };
  }
};

/**
 * 언론사 로고 목록 가져오기
 */
export const getPressLogos = async (): Promise<
  ApiResponse<pressLogoType[]>
> => {
  try {
    const logos = await fetchPressLogo();
    return {
      ok: true,
      status: 200,
      message: "전체 언론사 로고를 성공적으로 조회했습니다.",
      data: logos,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: "언론사 목록을 불러오는 중 서버 오류가 발생했습니다.",
      data: null,
    };
  }
};

/**
 * 특정 언론사 상세 대시보드 데이터 가져오기
 */
export const getPressDashboard = async (
  pressId: number
): Promise<ApiResponse<any>> => {
  try {
    const dashboardData = await fetchDashboardData(pressId);

    if (!dashboardData) {
      return {
        ok: false,
        status: 404,
        message: `ID ${pressId}번에 해당하는 언론사 데이터를 찾을 수 없습니다.`,
        data: null,
      };
    }

    return {
      ok: true,
      status: 200,
      message: "언론사 상세 데이터를 성공적으로 조회했습니다.",
      data: dashboardData,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: "데이터 로딩 중 예상치 못한 오류가 발생했습니다.",
      data: null,
    };
  }
};

/**
 * 카테고리별 언론사 필터링
 */
export const getPressLogosByCategory = async (): Promise<
  ApiResponse<any[]>
> => {
  try {
    const allLogos = await fetchPressLogo();
    const categoryData: any[] = [];

    allLogos.forEach((item) => {
      // 1. 현재 아이템의 카테고리가 이미 categoryData에 있는지 확인
      let categoryGroup = categoryData.find(
        (group) => group.category === item.category
      );

      // 2. 없으면 새로운 객체를 생성하고 categoryData에 추가
      if (!categoryGroup) {
        categoryGroup = {
          category: item.category,
          pressList: [],
        };
        categoryData.push(categoryGroup);
      }

      // 3. 해당 카테고리의 pressList에 현재 언론사 정보를 추가
      categoryGroup.pressList.push({
        id: item.id,
        press: item.press,
        logo: item.logo,
      });
    });

    return {
      ok: true,
      status: 200,
      message: `카테고리 데이터를 조회했습니다.`,
      data: categoryData,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: "카테고리 필터링 중 오류가 발생했습니다.",
      data: [],
    };
  }
};

const SUBSCRIBED_KEY = "subscribed_press_ids";

/**
 * [GET] 로컬스토리지에서 구독한 언론사 ID 목록 가져오기
 */
export const getSubscribedPressList = async () => {
  try {
    const storedData = localStorage.getItem(SUBSCRIBED_KEY);
    const subscribedIds: number[] = storedData ? JSON.parse(storedData) : [];

    return {
      ok: true,
      status: 200,
      message: `구독한 언론사 목록 데이터를 조회했습니다.`,
      data: subscribedIds,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: "구독한 언론사 목록 조회 중 오류가 발생했습니다.",
      data: [],
    };
  }
};

/**
 * [POST/PATCH] 구독 상태 토글 (추가/해제)
 * @param pressId - 언론사 고유 ID
 */
export const toggleSubscribe = async (pressId: number) => {
  if (pressId === null)
    return {
      ok: false,
      status: 404,
      message: "대상 언론사를 찾을 수 없습니다.",
      data: [],
    };
  try {
    const storedData = localStorage.getItem(SUBSCRIBED_KEY);
    let newListIds: number[] = storedData ? JSON.parse(storedData) : [];

    const isSubscribed = newListIds.includes(pressId);
    let message = "";

    if (isSubscribed) {
      // 이미 구독 중이면 해제
      newListIds = newListIds.filter((id) => id !== pressId);
      message = "구독이 해제되었습니다.";
    } else {
      // 구독 중이 아니면 추가
      newListIds.push(pressId);
      message = "구독 목록에 추가되었습니다.";
    }

    localStorage.setItem(SUBSCRIBED_KEY, JSON.stringify(newListIds));

    // 성공 응답 반환
    return {
      ok: true,
      status: 200,
      message: message,
      data: newListIds,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      message: "언론사 구독 처리 중 오류가 발생했습니다.",
      data: [],
    };
  }
};
