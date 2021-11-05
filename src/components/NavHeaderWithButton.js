// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import { Button, StyleSheet, View, TouchableOpacity, Platform, SafeAreaView } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import Text from "./Text";
import { Theme } from "./Theme";

import type { NavigationProps } from "./Types";

type NavHeaderProps = NavigationProps<*> & {
    title: string,
    back?: boolean,
    backFn?: () => void,
    buttonFn?: () => void,
    buttonIcon?: string
};

export default class NavHeaderWithButton extends React.Component<NavHeaderProps> {
    @autobind
    onPress() {
        const { backFn, navigation } = this.props;
        if (backFn) {
            backFn();
        } else {
            navigation.goBack();
        }
    }

    @autobind
    onPressButton() {
        const { buttonFn } = this.props;
        buttonFn();
    }

    render(): React.Node {
        const { onPress } = this;
        const { onPressButton } = this;
        const { title, back } = this.props;
        const { buttonIcon } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.side}>
                        {back && (
                            <TouchableOpacity {...{ onPress }}>
                                <View style={styles.back}>
                                    <Icon name="chevron-left" size={25} />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text type="header3">{title}</Text>
                    <View style={styles.side}>
                        <TouchableOpacity onPress={onPressButton}>
                            <Icon name={buttonIcon} size={25} color={Theme.palette.black} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        borderColor: Theme.palette.borderColor,
        borderBottomWidth: Platform.OS === "ios" ? 0 : 1,
        zIndex: 10000,
        backgroundColor: "#f3f6f4",
    },
    content: {
        marginTop: Platform.OS === "ios" ? 0 : 20,
        height: 57,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    side: {
        width: 40,
    },
    back: {
        marginLeft: Theme.spacing.tiny,
    },
});
