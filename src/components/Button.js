// @flow
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button as NBButton, Text, Spinner, View } from "native-base";

import { Theme } from "./Theme";

export default class Button extends React.Component<> {
  render(): React.Node {
    const { label, full, disabled, transparent, onPress, style, loading, textColor, hidden, pressed } = this.props;
    let appliedStyle;
    let primary = false;

    if (style === "primary") {
      appliedStyle = pressed ? styles.pressed : styles.primary;
      primary = true;
    } else if (style === "secondary") {
      appliedStyle = pressed ? styles.pressedSecondary : styles.secondary;
    } else if (style === "diagnosis") {
      appliedStyle = styles.diagnosisButton;
    } else if (style === "highlight") {
      appliedStyle = styles.highlight;
      primary = true;
    } else if (style === "defaultButton") {
      appliedStyle = styles.defaultButton;
      primary = true;
    } else if (style === "unpressed") {
      appliedStyle = styles.unpressed;
    } else if (style === "pressed") {
      appliedStyle = styles.pressed;
    } else {
      appliedStyle = styles.base;
    }

    if (hidden) {
      return <View />;
    }

    return (
      <NBButton
        title={label}
        style={appliedStyle}
        onPress={onPress}
        full={full}
        disabled={disabled}
        transparent={!primary || transparent}
      >
        {!!loading && <Spinner color="white" />}
        {!loading && (
          <Text
            style={{
              color: disabled ? "transparent" : textColor || (primary ? "white" : Theme.typography.color),
              fontSize: primary ? 16 : Theme.typography.regular.fontSize,
              fontFamily: Theme.typography.semibold,
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
    paddingHorizontal: 15,
  },
  primary: {
    backgroundColor: "black",  // Black background for primary button
    shadowColor: "rgba(85, 85, 85, 0.29)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 12,  // Slightly rounded for a softer look
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  secondary: {
    backgroundColor: "white",  // White background for secondary button
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  highlight: {
    backgroundColor: Theme.palette.secondary,
    shadowColor: "rgba(85, 85, 85, 0.29)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.palette.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  pressed: {
    backgroundColor: "grey",  // Grey background for primary button when pressed
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    width: "40%",
    opacity: 0.7, // Add opacity change for press feedback
  },
  pressedSecondary: {
    backgroundColor: "black", // Baby blue for secondary button when pressed
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    width: "40%",
    opacity: 0.7,
  },
  unpressed: {
    backgroundColor: Theme.palette.washedBlue,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.palette.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    width: "40%",
  },
  diagnosisButton: {
    backgroundColor: Theme.palette.primary,
    shadowColor: "rgba(85, 85, 85, 0.29)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 7,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.palette.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: -200,
    zIndex: 0,
    padding: 5,
    alignSelf: "center",
  },
});
