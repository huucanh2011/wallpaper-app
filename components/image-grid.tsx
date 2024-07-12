import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";

import { getColumnCount, wp } from "@/helpers/common";
import ImageCard from "./image-card";

type Props = {
  images: any[];
};

const ImageGrid = ({ images }: Props) => {
  const columns = getColumnCount();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard item={item} index={index} columns={columns} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});

export default ImageGrid;