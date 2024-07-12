import { StyleSheet, Text, View } from "react-native";
import React, { RefObject, useMemo } from "react";
import {
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { capitalize, hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { CommonFilterRow, SectionView } from "./filters-view";
import { data } from "@/constants/data";

type FiltersModalProps = {
  modalRef: RefObject<any>;
};

const FiltersModal = ({ modalRef }: FiltersModalProps) => {
  const snapPoints = useMemo(() => ["75%"], []);

  // const

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
      // onChange={handleSheetChange}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            let sectionData = data.filters[sectionName];
            let title = capitalize(sectionName);
            return (
              <View key={sectionName}>
                <SectionView
                  title={title}
                  content={sectionView({ data: sectionData })}
                />
              </View>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  order: (props: any) => <CommonFilterRow {...props} />,
  orientation: (props: any) => <SectionView {...props} />,
  type: (props: any) => <SectionView {...props} />,
  colors: (props: any) => <SectionView {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      {/* blur view */}
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    width: "100%",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    marginBottom: 5,
  },
});

export default FiltersModal;
