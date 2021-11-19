import * as React from "react";
import {StyleSheet, Dimensions, View} from "react-native";
import Constants from "expo-constants";
import {Text, Theme} from "../components";

export default class Slide extends React.PureComponent {

    render(): React.Node {
        const {title, description, icon} = this.props;
        return (
            <View>
                    <View style={styles.slide}>
                        <Text type="header2" style={styles.title}>{title}</Text>
                        <View style={styles.iconContainer}>{icon}</View>
                    </View>
                <View style={styles.description}>
                    <Text style={{color: Theme.palette.black}}>{description}</Text>
                </View>
            </View>
        );
    }
}

const {height} = Dimensions.get("window");
const styles = StyleSheet.create({
    slide: {
        paddingBottom: Theme.spacing.base * 2,
        paddingTop: (Theme.spacing.base * 2) + Constants.statusBarHeight,
        flexGrow: 1,
    },
    title: {
        paddingHorizontal: Theme.spacing.base * 2,
        color: Theme.palette.black,
    },
    description: {
        position: "absolute",
        top: height * 0.62,
        left: 0,
        right: 0,
        height: height - (height * 0.62) - 45,
        paddingHorizontal: Theme.spacing.base * 2,
        justifyContent: "center",
        color: Theme.palette.white
    },
    iconContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
