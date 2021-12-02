import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import SignUpContainer from "./SignUpContainer";
import {TextField, Firebase, Theme} from "../components";

export default class Login extends React.Component {

    state = {
        email: "",
        password: "",
        loading: false,
        icon: "eye",
        passView: true
    };

    setEmail = (email) => {
        this.setState({ email });
    }

    setPassword = (password) => {
        this.setState({ password });
    }

    //refs
    setPasswordRef = (input) => {
        this.password = input;
    }

    //go-tos
    goToPassword = () => {
        this.password.focus();
    }

    login = async () => {
        const {email, password} = this.state;
        if (email === "") {
            alert("Please provide an email address.");
        }
        else if (password === "") {
            alert("Please provide a password.");
        }
        else{
            try {
                this.setState({ loading: true });
                await Firebase.auth.signInWithEmailAndPassword(email, password);
            } 
            catch(error) {
                alert(error);
                this.setState({ loading: false });
            }
        }
    }

    passwordReset = () => {
        this.props.navigation.navigate("PasswordReset");
    }

    onPressEye = () => {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
            passView: !prevState.passView
        }));
     }

    render() {
        const {navigation} = this.props;
        const {loading, icon, passView} = this.state;

        return (
            <SignUpContainer
                title="Login"
                subtitle="Welcome Back"
                nextLabel="Login"
                next={this.login}
                first
                {...{ navigation, loading }}
            >
                <View style={styles.textContainer}>
                    <TextField
                        placeholder="Email"
                        keyboardType="email-address"
                        contrast
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={this.goToPassword}
                        onChangeText={this.setEmail}
                        style={styles.input}
                    />
                </View>
                <View style={styles.flexRow}>
                    <View style={styles.passContainer}>
                        <TextField
                            secureTextEntry={passView}
                            placeholder="Password"
                            contrast
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="go"
                            textInputRef={this.setPasswordRef} 
                            onSubmitEditing={this.login}
                            onChangeText={this.setPassword}
                            style={styles.input}
                        />
                    </View>
                    <Icon name={icon} color= '#00aced' size= {25} onPress= {() => this.onPressEye()} style={styles.icon}/>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.passwordReset}>
                        <Text style={styles.text}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </SignUpContainer>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        margin: 2,
        textAlign: 'left'
    },
    textContainer: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Theme.palette.lightGray,
        borderRadius: 8,
        marginVertical: 8
    },
    passContainer: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: Theme.palette.lightGray,
        borderRadius: 8,
        marginTop: 8,
        marginBottom: 15,
        width: "85%"
    },
    flexRow: {
        flexDirection: "row"
    },
    icon: {
        paddingTop:13, 
        marginLeft:10
    },
    container: {
        flexDirection: 'row',
        height: Theme.spacing.base * 1.2,
        justifyContent: 'center',
        marginBottom: 5
    },
    text: {
        color: 'gray',
        fontSize: 14,
    },
});