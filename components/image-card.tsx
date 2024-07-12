import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { getImageSize, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";

type Props = {
  item: any;
  index: number;
  columns: number;
};

const ImageCard = ({ item, index, columns }: Props) => {
  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(width, height) };
  };

  return (
    <Pressable style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
      <Image
        style={[styles.image, getImageHeight()]}
        source={{ uri: item?.webformatURL }}
        transition={100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: theme.colors.grayBG,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  image: {
    height: 300,
    width: "100%",
  },
  spacing: {
    marginRight: wp(2),
  },
});

export default ImageCard;