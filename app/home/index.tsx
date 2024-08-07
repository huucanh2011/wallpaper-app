import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import { useRouter } from "expo-router";

import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { apiCall, ParamsType } from "@/api";
import Categories from "@/components/categories";
import ImageGrid from "@/components/image-grid";
import FiltersModal from "@/components/filters-modal";

let page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{ [k: string]: string } | null>(null);
  const [images, setImages] = useState<any>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchInputRef = useRef<TextInput>(null);
  const modalRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const router = useRouter();

  const fetchImages = async (
    params: ParamsType = { page: 1 },
    append = true
  ) => {
    let res = await apiCall(params);
    if (res.success && res?.data?.hits) {
      if (append) {
        setImages([...images, ...res.data.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openFiltersModal = () => {
    modalRef.current?.present();
  };

  const closeFiltersModal = () => {
    modalRef.current?.close();
  };

  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params: ParamsType = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params);
    }
    closeFiltersModal();
  };

  const resetFilters = () => {
    if (filters) {
      page = 1;
      setFilters(null);
      setImages([]);
      let params: ParamsType = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params);
    }
    closeFiltersModal();
  };

  const clearThisFilter = (filterName: string) => {
    let filterz = { ...filters };
    delete filterz[filterName];
    setFilters({ ...filterz });
    page = 1;
    setImages([]);
    let params: ParamsType = {
      page,
      ...filterz,
    };
    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImages(params);
  };

  const handleChangeCategory = (cat: string | null) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params: ParamsType = {
      page,
      ...filters,
    };
    if (cat) params.category = cat;
    fetchImages(params, false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, q: text, ...filters });
    }

    if (text === "") {
      page = 1;
      searchInputRef.current?.clear();
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, ...filters });
    }
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current?.clear();
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        console.log("reached the bottom of scrollView");
        ++page;
        let params: ParamsType = {
          page,
          ...filters,
        };
        if (activeCategory) params.category = activeCategory;
        if (search) params.q = search;
        fetchImages(params);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };

  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* header */}
      <View style={styles.header}>
        <Pressable onPress={handleScrollUp}>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable onPress={openFiltersModal}>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5}
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
      >
        {/* search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            placeholder="Search for photos..."
            ref={searchInputRef}
            // value={search}
            onChangeText={handleTextDebounce}
            style={styles.searchInput}
          />
          {search && (
            <Pressable
              onPress={() => handleSearch("")}
              style={styles.closeIcon}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        {/* categories */}
        <View style={styles.categories}>
          <Categories
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* filters */}
        {filters && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filters}
            >
              {Object.keys(filters).map((key, index) => {
                return (
                  <View key={key} style={styles.filterItem}>
                    {key === "colors" ? (
                      <View
                        style={{
                          height: 20,
                          width: 30,
                          borderRadius: 7,
                          backgroundColor: filters[key],
                        }}
                      />
                    ) : (
                      <Text style={styles.filterItemText}>{filters[key]}</Text>
                    )}

                    <Pressable
                      style={styles.filterCloseIcon}
                      onPress={() => clearThisFilter(key)}
                    >
                      <Ionicons
                        name="close"
                        size={14}
                        color={theme.colors.neutral(0.9)}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* images masonry grid */}
        <View>
          {images.length > 0 && <ImageGrid images={images} router={router} />}
        </View>

        {/* loading */}
        <View
          style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}
        >
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>

      {/* filters modal */}
      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFiltersModal}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.lg,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.radius.xs,
    padding: 8,
    gap: 10,
    paddingHorizontal: 10,
  },
  filterItemText: {
    fontSize: hp(1.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 7,
  },
});

export default HomeScreen;
