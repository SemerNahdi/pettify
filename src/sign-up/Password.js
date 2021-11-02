// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import {TextField, Firebase} from "../components";
import SignUpStore from "./SignUpStore";
import SignUpContainer from "./SignUpContainer";
import type {NavigationProps} from "../components/Types";
import {View, StyleSheet} from "react-native";
import {Theme} from "../components/Theme";

export default class Password extends React.Component {

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
        const {email, displayName} = SignUpStore;
        const {displayAddress} = SignUpStore;
        try {
            if (password === "") {
                throw new Error("Please provide a password.");
            }
            this.setState({ loading: true });
            const user = await Firebase.auth.createUserWithEmailAndPassword(email, password);
            await Firebase.firestore.collection("users").doc(user.user.uid).set(
                {
                    name: displayName,
                    email: email,
                    address: displayAddress,
                    role: "p",
                    pic: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/fiber%2Fprofile%2FJ0k2SZiI9V9KoYZK7Enru5e8CbqFxdzjkHCmzd2yZ1dyR22Vcjc0PXDPslhgH1JSEOKMMOnDcubGv8s4ZxA.jpg?alt=media&token=6d5a2309-cf94-4b8e-a405-65f8c5c6c87c",
                }
            )
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
                <View style={{flexDirection:"row"}}>
                    <TextField
                        secureTextEntry= {passView}
                        placeholder="Password"
                        contrast
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="go"
                        onSubmitEditing={this.next}
                        onChangeText={this.setPassword}
                        style={styles.textInput}
                    />
                    <Icon name= {icon} color= '#00aced' size= {25} onPress= {() => this.onPressEye()} style={{paddingTop:13, marginLeft:10}}/>
                </View>
            </SignUpContainer>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: Theme.palette.borderColor,
        borderWidth: 1,
        borderRadius: 3,
        ...Theme.typography.regular,
        color: Theme.typography.color,
        padding: Theme.spacing.small,
        marginBottom: Theme.spacing.base,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 1,
        width: "85%"
    }
});