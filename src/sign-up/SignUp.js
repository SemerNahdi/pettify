import * as React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { TextField, Theme, Firebase } from "../components";
import SignUpContainer from "./SignUpContainer";

export default class Name extends React.Component {

    state = {
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        passView: true,
        icon: "eye",
        loading: false,
    };

    setFirstName = (firstName) => {
        this.setState({ firstName });
    }

    setLastName = (lastName) => {
        this.setState({ lastName });
    }

    setAddress = (address) => {
        this.setState({ address });
    }

    setEmail = (email) => {
        this.setState({ email })
    }

    setPassword = (password) => {
        this.setState({ password })
    }

    //refs
    setLastNameRef = (input) => {
        this.lastName = input;
    }

    setAddressRef = (input) => {
        this.address = input;
    }

    setEmailRef = (input) => {
        this.email = input;
    }

    setPasswordRef = (input) => {
        this.password = input
    }

    //go-tos
    goToLastName = () => {
        this.lastName.focus();
    }

    goToAddress = () => {
        this.address.focus();
    }

    goToEmail = () => {
        this.email.focus();
    }

    goToPassword = () => {
        this.password.focus();
    }

    onPressEye = () => {
        this.setState(prevState => ({
            icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
            passView: !prevState.passView
        }));
     }

    next = async () => {
        const {firstName, lastName, address, email, password} = this.state;
        if (firstName === "") {
            alert("Please provide a first name.");
        } 
        else if (lastName === "") {
            alert("Please provide a last name.");
        } 
        else if (address === "") {
            alert("Please provide an address");
        } 
        else if (email === "") {
            alert("Please provide an email")
        } 
        else if (password === "") {
            alert("Please provide a password");
        }
        else {
            try {
                this.setState({ loading: true });

                const user = await Firebase.auth.createUserWithEmailAndPassword(this.state.email, this.state.password)

                await Firebase.firestore.collection("users").doc(user.user.uid).set(
                    {
                        name: firstName + " " + lastName,
                        email: email,
                        address: address,
                        role: "p",
                        pic: Theme.links.defaultProfile,
                    }
                )
            }
            catch(error) {
                alert(error);
                this.setState({ loading: false })
            }
        }
    }

    render() {
        const {navigation} = this.props;
        const {loading, icon, passView} = this.state;

        return (
            <SignUpContainer 
                title="Your Info" 
                subtitle="Get Started" 
                nextLabel="Sign Up" 
                next={this.next} 
                first 
                {...{navigation, loading}}
            >
                
                <View style={styles.textContainer}>
                    <TextField
                        placeholder="First Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={this.goToLastName}
                        onChangeText={this.setFirstName}
                        style={styles.input}
                    />
                </View>

                <View style={styles.textContainer}>
                    <TextField
                        placeholder="Last Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        textInputRef={this.setLastNameRef}
                        onSubmitEditing={this.goToAddress}
                        onChangeText={this.setLastName}
                        style={styles.input}
                    />
                </View>

                <View style={styles.textContainer}>    
                    <TextField
                        placeholder="Address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        textInputRef={this.setAddressRef}
                        onSubmitEditing={this.goToEmail}
                        onChangeText={this.setAddress}
                        style={styles.input}
                    />
                </View>

                <View style={styles.textContainer}>
                    <TextField
                        placeholder="Email"
                        keyboardType="email-address"
                        contrast
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        textInputRef={this.setEmailRef}
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
                            onSubmitEditing={this.next}
                            onChangeText={this.setPassword}
                            style={styles.input}
                        />
                    </View>
                    <Icon name={icon} color= '#00aced' size= {25} onPress= {() => this.onPressEye()} style={styles.icon}/>
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
        marginBottom: 25,
        width: "85%"
    },
    flexRow: {
        flexDirection: "row"
    },
    icon: {
        paddingTop:13, 
        marginLeft:10
    }
});