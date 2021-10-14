// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import {TextField, Firebase} from "../components";
import SignUpStore from "./SignUpStore";
import SignUpContainer from "./SignUpContainer";
import type {NavigationProps} from "../components/Types";
import type {Profile} from "../components/Model";
import {View, StyleSheet} from "react-native";
import {Theme} from "../components/Theme";
import { TextInput } from "react-native-gesture-handler";

type PasswordState = {
    email: string,
    password: string,
    loading: boolean,
    icon: string,
    passView: boolean
};

export default class Password extends React.Component<NavigationProps<*>, PasswordState> {

    state = {
        email: "",
        password: "",
        loading: false,
        icon: "eye",
        passView: true
    };


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
    async next(): Promise<void> {
        
        const {password, email} = this.state;
        

        try { 
            if (email === "") {
                throw new Error("Please provide an email address.");
            }
            if (password === "") {
                throw new Error("Please provide a password.");
            }
            this.setState({ loading: true });
            const user = await Firebase.auth.createUserWithEmailAndPassword(email, password);
            const profile: Profile = {
                name: "Vet",
                email: email,
                role: "V",
                outline: "React Native",
                picture: {
                    // eslint-disable-next-line max-len
                    uri: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/fiber%2Fprofile%2FJ0k2SZiI9V9KoYZK7Enru5e8CbqFxdzjkHCmzd2yZ1dyR22Vcjc0PXDPslhgH1JSEOKMMOnDcubGv8s4ZxA.jpg?alt=media&token=6d5a2309-cf94-4b8e-a405-65f8c5c6c87c",
                    preview: "data:image/gif;base64,R0lGODlhAQABAPAAAKyhmP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                }
            };
            await Firebase.firestore.collection("users").doc(user.user.uid).set(profile)
            .then(() => {
                this.props.navigation.navigate("Vet")
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
            <SignUpContainer title="Vet Creation" subtitle="" next={this.next} {...{ navigation, loading }}>
                <View style={{flexDirection:"column"}}>
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
    },
    container: {
        flexDirection: 'row',
        height: Theme.spacing.base * 1.2,
        justifyContent: 'center',
    },
    text: {
        color: 'gray',
        fontSize: 14,
    },
});