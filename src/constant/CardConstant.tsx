import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const numberOfColumns = 2;
export const CARD_MARGIN = 10;
export const CARD_WIDTH = (screenWidth - CARD_MARGIN * (numberOfColumns + 1)) / numberOfColumns;