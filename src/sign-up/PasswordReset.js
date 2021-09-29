// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View} from "react-native";

import {Firebase, TextField, Switch, Theme, Text} from "../components";
import type {NavigationProps} from "../components/Types";

import SignUpStore from "./SignUpStore";
import SignUpContainer from "./SignUpContainer";

type PasswordResetState = {
    email: string
};

export default class PasswordReset extends React.Component<NavigationProps<*>, PasswordResetState> {

    state = {
        email: ""
    };

    @autobind
    setEmail(email: string) {
        this.setState({ email });
    }

    @autobind
    next() {        
        const {email} = this.state;
        if (email === "") {
            // eslint-disable-next-line
            alert("Please provide an email.");
        } else {
            const auth = Firebase.auth;
            auth.sendPasswordResetEmail(email)
            .then(() => {
                // Password reset email sent!
                // ..
                this.props.navigation.pop();
                console.log("Reset password email sent!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });
        }
    }

    render(): React.Node {
        const {navigation} = this.props;
        return (
            <SignUpContainer 
                title="Reset Password"
                subtitle=""
                nextLabel="Send Email Link"
                next={this.next} 
                {...{ navigation }}
            >
                <TextField 
                    placeholder="Email"
                    keyboardType="email-address"
                    contrast
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    onSubmitEditing={this.next}
                    onChangeText={this.setEmail}
                />
                <View style={styles.container}>
                    <Text style={styles.text}>Please enter the email address associated with your account</Text>
                </View>
            </SignUpContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        color: 'gray',
        flex: 1,
        fontSize: 13,
        lineHeight: 16,
        paddingStart: 8,
        paddingEnd: 8,
        paddingBottom: 16,
        textAlign: 'center',
    },
});