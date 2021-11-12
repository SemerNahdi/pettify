// @flow
import * as React from "react";
import { StyleSheet} from "react-native";
import {Button as NBButton, Text, Spinner} from "native-base";

import {Theme} from "./Theme";

export default class Button extends React.Component<> {
    render(): React.Node {
        const {label, full, disabled, transparent, onPress, style, loading} = this.props;
        
        var appliedStyle
        var primary = false

        if(style === "primary")
        {
            appliedStyle = styles.primary
            primary = true
        }
        else if(style === "secondary")
        {
            appliedStyle = styles.secondary
        }
        else if(style === "diagnosis")
        {
            appliedStyle = styles.diagnosisButton
        }
        else if(style === "highlight")
        {
            appliedStyle = styles.highlight
            primary = true
        }
        else if(style === "defaultButton")
        {
            appliedStyle = styles.defaultButton
            primary = true
        }
        else if(style === "unpressed")
        {
            appliedStyle = styles.unpressed
        }
        else if(style === "pressed")
        {
            appliedStyle = styles.pressed
        }
        else
        {
            appliedStyle = styles.base
        }

        return (
            <NBButton
                title={label}
                style = { appliedStyle }
                onPress = {onPress}
                full = {full}
                disabled = {disabled}
                transparent = {!primary || transparent}
            >
                {!!loading && (<Spinner color="white" />)}
                {!loading &&(
                <Text
                    style={{
                        color: disabled ? "transparent" : (primary ? (transparent ? Theme.palette.primary : Theme.palette.black) : Theme.typography.color),
                        fontSize: primary ? 16 : Theme.typography.regular.fontSize,
                        fontFamily: Theme.typography.semibold
                    }}
                >
                    {label}
                </Text>
                )}
            </NBButton>
        );
    }
}

const styles = StyleSheet.create({
    base: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    primary: {
        backgroundColor: Theme.palette.primary,
        shadowColor: "rgba(85, 85, 85, 0.29)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    secondary: {
        backgroundColor: Theme.palette.secondary,
        shadowColor: "rgba(85, 85, 85, 0.29)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    defaultButton: {
        backgroundColor: Theme.palette.primary,
        shadowColor: "rgba(85, 85, 85, 0.29)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    highlight: {
        backgroundColor: Theme.palette.secondary,
        shadowColor: "rgba(85, 85, 85, 0.29)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    pressed: {
        backgroundColor: Theme.palette.primary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
        width: "40%"
    },
    unpressed: {
        backgroundColor: Theme.palette.washedBlue,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
        width: "40%"
    },
    diagnosisButton: {
        backgroundColor: Theme.palette.primary,
        shadowColor: "rgba(85, 85, 85, 0.29)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 7,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.palette.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
        position: 'absolute',
        bottom: -200,
        zIndex: 0,
        padding: 5,
        alignSelf: "center"
    }
});
