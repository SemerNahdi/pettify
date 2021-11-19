// @flow
import * as React from "react";
import {StyleSheet, View, Platform} from "react-native";
import {AnimatedView} from "../components";

export default class Connect extends React.Component {

    state = {
        visible: true
    };

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    render(): React.Node {
        const {visible} = this.state;
        if (!visible) {
            return <View />;
        }
        return (
            <View style={styles.container}>
                <AnimatedView style={styles.phone} />
                <AnimatedView delay={200} style={styles.screenContainer}>
                    <View style={styles.screen} />
                    <View style={styles.foot} />
                    <View style={styles.base} />
                </AnimatedView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 172,
        height: 134
    },
    phone: {
        borderRadius: 4,
        width: 54,
        height: 94,
        backgroundColor: "#E0F5FF",
        borderColor: "white",
        borderTopWidth: 12.5,
        borderBottomWidth: 12.5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 200,
        shadowColor: "#81F1F7",
        shadowOffset: { width: 3, height: 6 },
        shadowOpacity: 0.54,
        shadowRadius: 9,
        elevation: 4
    },
    screenContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        alignItems: "center"
    },
    screen: {
        borderRadius: 6,
        width: 151,
        height: 108,
        backgroundColor: "#E0F5FF",
        borderColor: "white",
        borderTopWidth: 6,
        borderBottomWidth: 25,
        borderLeftWidth: 6,
        borderRightWidth: 6
    },
    foot: {
        backgroundColor: "#CCE9FF",
        width: 40,
        height: 16
    },
    base: {
        backgroundColor: "#F5FBFF",
        width: 82,
        height: 2
    }
});
