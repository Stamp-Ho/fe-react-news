import rollingNewsData from "./rollingNewsData.json";
import pressLogoData from "./pressLogoData.json";
import pressDashboardData from "./pressDashboardData.json";
export const fetchRollingNews = async () => {
  try {
    const newsList = rollingNewsData;
    // console.log(newsList);
    // const result = createShuffleQueue(newsList);
    // console.log(result);

    return newsList;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPressLogo = async () => {
  try {
    const pressData = pressLogoData;

    return pressData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//데이터 아직 없음
export const fetchDashboardData = async (id: number) => {
  try {
    const data = pressDashboardData;

    const result = data.find((d) => d.id === id);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
