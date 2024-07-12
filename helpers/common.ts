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

export const getColumnCount = () => {
  if (deviceWith >= 1024) {
    // desktop
    return 4;
  } else if (deviceWith >= 768) {
    // tablet
    return 3;
  } else {
    // phone
    return 2;
  }
};

export const getImageSize = (width: number, height: number) => {
  if (width > height) {
    // landscape
    return 250;
  } else if (width < height) {
    // portrait
    return 300;
  } else {
    // square
    return 200;
  }
};

export const capitalize = (str: string) => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};
