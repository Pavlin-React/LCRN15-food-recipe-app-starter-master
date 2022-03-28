import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";
import { CategoryCard } from "../components";
import { SIZES, FONTS, COLORS, images, dummyData, icons } from "../constants";

const Home = ({ navigation }) => {
  let renderSection = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          alignItems: "center",
          height: 80,
        }}
      >
        {/* Text */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.darkGreen, ...FONTS.h2 }}>
            Hello John
          </Text>
          <Text style={{ marginTop: 3, color: COLORS.gray, ...FONTS.h3 }}>
            What you want to cook today?
          </Text>
        </View>
        {/* Image */}
        <TouchableOpacity onPress={() => console.log("Profile")}>
          <Image
            source={images.profile}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  let renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          marginHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
        }}
      >
        <Image
          source={icons.search}
          style={{ width: 20, height: 20, tintColor: COLORS.gray }}
        />
        <TextInput
          style={{ marginLeft: SIZES.radius, ...FONTS.body3 }}
          placeholder="Search Recipe"
          placeholderTextColor={COLORS.gray}
        />
      </View>
    );
  };
  let renderSeeRecipeCard = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: COLORS.lightGreen,
        }}
      >
        {/* Image */}
        <View
          style={{ width: 100, alignItems: "center", justifyContent: "center" }}
        >
          <Image source={images.recipe} style={{ width: 80, height: 80 }} />
        </View>
        {/* Text */}
        <View style={{ flex: 1, paddingVertical: SIZES.radius }}>
          <Text style={{ width: "70%", ...FONTS.body4 }}>
            You have 12 recipes that you did not tried yet
          </Text>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => console.log("Recipes")}
          >
            <Text
              style={{
                color: COLORS.darkGreen,
                textDecorationLine: "underline",
                ...FONTS.h4,
              }}
            >
              See Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  let renderTrendingSection = () => {
    return (
      <View st={{ marginTop: 10 }}>
        <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>
          Trending Recipes
        </Text>
        <FlatList
          data={dummyData.trendingRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => {
            return(
              <View>
                <Text>
                  {item.name}
                </Text>
              </View>
            )
          }}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderSection()}
            {/* Search Bar */}
            {renderSearchBar()}
            {/* See recipe Card */}
            {renderSeeRecipeCard()}
            {/* Trending Section */}
            {renderTrendingSection()}
            {/* Category Card */}
          </View>
        }
        renderItem={({ item }) => {
          return (
            <CategoryCard
              categoryItem={item}
              containerStyle={{ marginHorizontal: SIZES.padding }}
              onPress={() => navigation.navigate("Recipe", { recipe: item })}
            />
          );
        }}
        ListFooterComponent={<View style={{ marginBottom: 100 }} />}
      />
    </SafeAreaView>
  );
};

export default Home;
