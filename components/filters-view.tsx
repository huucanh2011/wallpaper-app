import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";

export const SectionView = ({ title, content }: any) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommonFilterRow = () => {
  return (
    <View>
      <Text>Order View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.neutral(0.8),
  },
});
