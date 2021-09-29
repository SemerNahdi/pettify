// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import { StyleSheet, TextInput, Text, TouchableOpacity, View, Dimensions} from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

import SignUpContainer from "./SignUpContainer";

import {TextField, Firebase, Theme} from "../components";
import type {NavigationProps} from "../components/Types";

type LoginState = {
    email: string,
    password: string,
    loading: boolean,
    icon: string,
    passView: boolean
};

export default class Login extends React.Component<NavigationProps<*>, LoginState> {

    state: LoginState = {
        email: "",
        password: "",
        loading: false,
        icon: "eye",
        passView: true
    };

    password: TextInput;

    @autobind
    setEmail(email: string) {
        this.setState({ email });
    }

    @autobind
    setPassword(password: string) {
        this.setState({ password });
    }

    @autobind
    setPasswordRef(input: TextInput) {
        this.password = input;
    }

    @autobind
    goToPassword() {
        this.password.focus();
    }

    @autobind
    setIcon(icon: string) {
        this.setState({ icon });
    }

    @autobind
    setPassView(passView: boolean) {
        this.setState({ passView });
    }

    @autobind
    async login(): Promise<void> {
        const {email, password} = this.state;
        try {
            if (email === "") {
                throw new Error("Please provide an email address.");
            }
            if (password === "") {
                throw new Error("Please provide a password.");
            }
            this.setState({ loading: true });
            await Firebase.auth.signInWithEmailAndPassword(email, password);
        } catch (e) {
            // eslint-disable-next-line no-alert
            alert(e);
            this.setState({ loading: false });
        }
    }

    @autobind
    back() {
        this.props.navigation.navigate("Welcome");
    }

    onPressEye = () => {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
            passView: !prevState.passView
        }));
     }

    render(): React.Node {
        const {navigation} = this.props;
        const {loading} = this.state;
        const {icon} = this.state;
        const {passView} = this.state;
        return (
            <SignUpContainer
                title="Login"
                subtitle="Welcome Back"
                nextLabel="Login"
                next={this.login}
                first
                {...{ navigation, loading }}
            >
                <TextField
                    placeholder="Email"
                    keyboardType="email-address"
                    contrast
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={this.goToPassword}
                    onChangeText={this.setEmail}
                />
                <TextField
                    secureTextEntry= {passView}
                    placeholder="Password"
                    contrast
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    textInputRef={this.setPasswordRef}
                    onSubmitEditing={this.login}
                    onChangeText={this.setPassword}
                />
                <View style={styles.container}>
                    <View style={styles.icon}>
                        <Icon name= {icon} color= '#00aced' size= {20} onPress= {() => this.onPressEye()} />
                    </View>
                    <TouchableOpacity onPress={this.back}>
                        <Text style={styles.text}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </SignUpContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: Theme.spacing.base * 1.2,
        justifyContent: 'space-between',
    },
    icon: {
        flex: 1,
        paddingStart: 12,
    },
    text: {
        color: 'gray',
        flex: 1,
        fontSize: 15,
        paddingEnd: 8,
    },
});