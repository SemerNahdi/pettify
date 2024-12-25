// Welcome.js
// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import { StyleSheet, Dimensions, View, Animated } from "react-native";

import { Text, Button, Container, Logo, Theme, Firebase, serializeException } from "../components";
import type { ScreenProps } from "../components/Types";

export default class Welcome extends React.Component<ScreenProps<>> {
    fadeAnim = new Animated.Value(0); // Initial opacity set to 0

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    componentDidMount() {
        // Start the fade-in animation when the component mounts
        Animated.timing(this.fadeAnim, {
            toValue: 1, // Final opacity
            duration: 1000, // Duration of the animation
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    }

    render(): React.Node {
        return (
            <Container gutter={2} style={styles.root}>
                <Logo />
                <Animated.View style={[styles.container, { opacity: this.fadeAnim }]}>
                    <Text type="header1" style={styles.header}>Pet Care</Text>
                </Animated.View>
                <Animated.View style={[styles.container, { opacity: this.fadeAnim }]}>
                    <View style={styles.buttonContainer}>
                        <Button
                            label="Login"
                            onPress={this.login}
                            full
                            style={styles.commonButton} // Applying common button styles
                            textStyle={styles.commonButtonText} // Text color styles
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            label="Sign Up"
                            onPress={this.signUp}
                            full
                            style={[styles.commonButton, styles.signupButton]} // Common button styles with additional styles for Sign Up
                            textStyle={styles.commonButtonText} // Text color styles
                        />
                    </View>
                </Animated.View>
            </Container>
        );
    }
}

// Styles
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        alignSelf: "stretch"
    },
    header: {
        color: Theme.palette.black,
        textAlign: "center",
        marginTop: Theme.spacing.base * 2,
        marginBottom: Theme.spacing.base * 2
    },
    buttonContainer: {
        marginBottom: 10, // Optional: spacing between buttons
        width: '100%', // Make buttons stretch to the width of the parent
        backgroundColor: 'white', // Background color for the button container
        borderColor: 'black', // Border color for the button container
        borderWidth: 1, // Border width for the button container
        borderRadius: 8, // Rounded corners for the button container
    },
    commonButton: {
        overflow: 'hidden', // Prevent button overflow
        paddingVertical: 10, // Add vertical padding
        alignItems: 'center', // Center the button text
    },
    commonButtonText: {
        color: 'white', // White text color for the Login button
        fontSize: 16, // Adjust the font size as necessary
    },
    signupButton: {
        backgroundColor: 'white', // White background for the Sign Up button
    },
});
