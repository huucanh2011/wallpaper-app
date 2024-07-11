import { Dimensions } from "react-native";

const { width: deviceWith, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage: number) => {
  const width = deviceWith;

  return (percentage * width) / 100;
};

export const hp = (percentage: number) => {
  const height = deviceHeight;

  return (percentage * height) / 100;
};
