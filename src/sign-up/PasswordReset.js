import * as React from "react";
import {StyleSheet, View} from "react-native";
import {Firebase, TextField, Text, Theme} from "../components";
import SignUpContainer from "./SignUpContainer";

export default class PasswordReset extends React.Component {

    state = {
        email: ""
    };

    setEmail = (email) => {
        this.setState({ email });
    }

    next = () => {        
        const {email} = this.state;

        if (email === "") {
            alert("Please provide an email.");
        } 
        else {
            const auth = Firebase.auth;
            auth.sendPasswordResetEmail(email)
            .then(() => {
                this.props.navigation.pop();
            })
            .catch((error) => {
                alert(error.message);
            });
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <SignUpContainer 
                title="Reset Password"
                subtitle=""
                nextLabel="Send Email Link"
                next={this.next} 
                {...{ navigation }}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>Please enter the email address associated with your account</Text>
                </View>
                <View style={styles.textContainer}>
                    <TextField 
                        placeholder="Email"
                        keyboardType="email-address"
                        contrast
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="go"
                        onSubmitEditing={this.next}
                        onChangeText={this.setEmail}
                        style={styles.input}
                    />
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
        marginTop: 8,
        marginBottom: 20
    },
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
        textAlign: 'left',
    },
});