import { StyleSheet } from "react-native";
import { CARD_MARGIN } from "./CardConstant";

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: CARD_MARGIN,
        paddingBottom: 20,
    },
    row: {
        justifyContent: "space-between",
    },
});

export const LIST_COLUMN_WRAPPER_STYLE = styles.row;
export const LIST_CONTENT_CONTAINER_STYLE = styles.list;