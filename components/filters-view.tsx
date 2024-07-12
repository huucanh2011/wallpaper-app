import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";

import { capitalize, hp } from "@/helpers/common";
import { theme } from "@/constants/theme";

export const SectionView = ({ title, content }: any) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

type CommonFilterRowProps = {
  data: string[];
  filters: { [k: string]: string } | null;
  setFilters: Dispatch<SetStateAction<{ [k: string]: string } | null>>;
  filterName: string;
};

export const CommonFilterRow = ({
  data,
  filters,
  setFilters,
  filterName,
}: CommonFilterRowProps) => {
  const onSelect = (item: string) => {
    setFilters({ ...filters, [filterName]: item });
  };

  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item) => {
          const isActive = filters && filters[filterName] === item;
          const backgroundColor = isActive
            ? theme.colors.neutral(0.7)
            : "white";
          const color = isActive ? "white" : theme.colors.neutral(0.7);

          return (
            <Pressable
              key={item}
              onPress={() => onSelect(item)}
              style={[styles.outlinedButton, { backgroundColor }]}
            >
              <Text style={[styles.outlinedButtonText, { color }]}>
                {capitalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export const ColorFilterRow = ({
  data,
  filters,
  setFilters,
  filterName,
}: CommonFilterRowProps) => {
  const onSelect = (item: string) => {
    setFilters({ ...filters, [filterName]: item });
  };

  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item) => {
          const isActive = filters && filters[filterName] === item;
          const borderColor = isActive ? theme.colors.neutral(0.4) : "white";

          return (
            <Pressable key={item} onPress={() => onSelect(item)}>
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
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
  flexRowWrap: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  outlinedButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
  },
  outlinedButtonText: {},
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  },
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
  },
});
