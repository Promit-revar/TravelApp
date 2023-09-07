export const getWeatherCondition = (aqi: number) => {
  if (aqi < 50) {
    return {
      condition: "Good",
      background: "bg-green-500",
    };
  } else if (aqi < 100 && aqi > 50) {
    return {
      condition: "Moderate",
      background: "bg-yellow-500",
    };
  } else if (aqi > 100 && aqi < 150) {
    return { condition: "Poor", background: "bg-orange-500" };
  } else if (aqi > 150) {
    return {
      condition: "Unhealthy",
      background: "bg-red-500",
    };
  }
};
