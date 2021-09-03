// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import { FontAwesome5 as Icon } from "@expo/vector-icons";

import {TextField, Firebase} from "../components";

import SignUpStore from "./SignUpStore";
import SignUpContainer from "./SignUpContainer";

import type {NavigationProps} from "../components/Types";
import type {Profile} from "../components/Model";

type PasswordState = {
    password: string,
    loading: boolean,
    icon: string,
    passView: boolean
};

export default class Password extends React.Component<NavigationProps<*>, PasswordState> {

    state = {
        password: "",
        loading: false,
        icon: "eye",
        passView: true
    };

    @autobind
    setPassword(password: string) {
        this.setState({ password });
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
    async next(): Promise<void> {
        const {password} = this.state;
        const {email, displayName, role} = SignUpStore;
        console.log("value", role)
        try {
            if (password === "") {
                throw new Error("Please provide a password.");
            }
            this.setState({ loading: true });
            const user = await Firebase.auth.createUserWithEmailAndPassword(email, password);
            const profile: Profile = {
                name: displayName,
                role: role.value,
                outline: "React Native",
                picture: {
                    // eslint-disable-next-line max-len
                    uri: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/fiber%2Fprofile%2FJ0k2SZiI9V9KoYZK7Enru5e8CbqFxdzjkHCmzd2yZ1dyR22Vcjc0PXDPslhgH1JSEOKMMOnDcubGv8s4ZxA.jpg?alt=media&token=6d5a2309-cf94-4b8e-a405-65f8c5c6c87c",
                    preview: "data:image/gif;base64,R0lGODlhAQABAPAAAKyhmP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                }
            };
            await Firebase.firestore.collection("users").doc(user.user.uid).set(profile)
            .then(() => {
                this.props.navigation.navigate("Walkthrough")
            });
        } catch (e) {
            // eslint-disable-next-line no-alert
            alert(e);
            this.setState({ loading: false });
        }
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
            <SignUpContainer title="Your Password" subtitle="" next={this.next} {...{ navigation, loading }}>
                <TextField
                    secureTextEntry= {passView}
                    placeholder="Password"
                    contrast
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    onSubmitEditing={this.next}
                    onChangeText={this.setPassword}
                />
                <Icon name= {icon} color= '#00aced' size= {20} onPress= {() => this.onPressEye()} />
            </SignUpContainer>
        );
    }
}