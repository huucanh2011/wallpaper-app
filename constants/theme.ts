import { TextStyle } from "react-native";

export const theme = {
  colors: {
    white: "#fff",
    black: "#000",
    grayBG: "#e5e5e5",
    neutral: (opacity: number) => `rgba(10, 10, 10, ${opacity})`,
  },
  fontWeights: {
    medium: "500" as TextStyle["fontWeight"],
    semibold: "600" as TextStyle["fontWeight"],
    bold: "700" as TextStyle["fontWeight"],
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
};
