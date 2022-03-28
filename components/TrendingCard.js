import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SIZES, FONTS, COLORS, icons } from "../constants";

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 250,
        height: 350,
        marginTop: SIZES.radius,
        marginRight: 20,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={recipeItem.image}
        style={{width: 250, height: 350, borderRadius: SIZES.radius}}
        resizeMode='cover'
      />
    </TouchableOpacity>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({});
