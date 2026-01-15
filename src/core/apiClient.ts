import {
  getRollingNews,
  getPressLogos,
  getPressDashboard,
  getPressLogosByCategory,
  getSubscribedPressList,
  toggleSubscribe,
} from "../libs/apis/apis";

export class ApiError extends Error {
  constructor(public message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}
export interface ApiResponse<T> {
  ok: boolean;
  status: number;
  message: string;
  data: T | null;
}
export const apiClient = async (url: string, options?: RequestInit) => {
  //얘를 src/libs/apis/apis.ts에 있는 (mockServerAPI)들이랑 연결하면 됨.
  //const response = await fetch(url, options);
  const paresedUrl = url.split("/")[0]; // "entrypoint"
  const param = parseInt(url.split("id=")[1], 10); // 1
  let response: ApiResponse<any> = {
    ok: false,
    status: 500,
    message: "응애",
    data: [],
  };
  switch (paresedUrl) {
    case "pressLogos":
      response = await getPressLogos();
      break;
    case "pressDashboard":
      response = await getPressDashboard(param);
      break;
    case "rollingNews":
      response = await getRollingNews();
      break;
    case "pressLogosByCategory":
      response = await getPressLogosByCategory();
      break;
    case "subscribedPressList":
      response = await getSubscribedPressList();
      break;
    case "toggleSubscribe":
      response = await toggleSubscribe(param);
      break;
    default:
  }

  if (!response?.ok) {
    const errorBody = { message: "mock server Error" }; //await response.json().catch(() => ({}));
    throw new ApiError(
      errorBody.message || "알 수 없는 에러가 발생했습니다.",
      response.status
    );
  }

  return response.data; //return response.json();
};
