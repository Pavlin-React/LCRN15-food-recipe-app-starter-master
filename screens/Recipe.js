import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { COLORS, FONTS, SIZES, icons } from "../constants";

let Header_Hight = 350;

let RecipeCreatorCardDetail = ({selectedRecipe}) => {
  return(
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >  
      {/* Profile Photo */}
      <View style={{width: 40, height: 40, marginLeft: 20}} >
        <Image
          source={selectedRecipe?.author?.profilePic}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
      </View>
      {/* Profile Photo */}

      {/* Profile Photo */}
    </View>
  )
}

let RecipeCreatorCardInfo = ({ selectedRecipe }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView
        style={{ flex: 1, borderRadius: SIZES.radius }}
        blurType="dark"
      >
        <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.transparentBlack9,
        }}
      ></View>
    );
  }
};

const Recipe = ({ navigation, route }) => {
  let [selectedRecipe, setSelectedRecipe] = useState(null);
  let scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);
  let renderRecipeCardHeader = () => {
    return (
      <View
        style={{
          alignItems: "center",
          overflow: "hidden",
          marginTop: -1000,
          paddingTop: 1000,
        }}
      >
        {/* Background Image */}
        <Animated.Image
          source={selectedRecipe?.image}
          resizeMode="contain"
          style={{
            height: Header_Hight,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-Header_Hight, 0, Header_Hight],
                  outputRange: [-Header_Hight / 2, 0, Header_Hight * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-Header_Hight, 0, Header_Hight],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
        {/* Recipe Creator Card */}
        <Animated.View
          style={{
            position: "absolute",
            left: 30,
            right: 30,
            bottom: 10,
            height: 80,
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderRecipeCardHeader()}
            {/* Info */}

            {/* Ingredient Title */}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 30,
              marginVertical: 5,
            }}
          >
            {/* Icon */}
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "50",
                width: "50",
                borderRadius: 5,
                backgroundColor: COLORS.lightGray,
              }}
            >
              <Image source={item.icon} style={{ width: 40, height: 40 }} />
            </View>

            {/* Description */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
            </View>

            {/* Quantity */}
            <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
              <Text style={{ ...FONTS.body3 }}>{item.quantity}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Recipe;
