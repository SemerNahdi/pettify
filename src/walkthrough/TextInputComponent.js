// @flow
import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

import { Theme, Button } from "../components";
import Firebase from "../components/Firebase";

export class GetStartedButton extends React.Component {
    // Call after Get Started button is pressed
    addPetNameToFirestore(name) {
        const { uid } = Firebase.auth.currentUser;

        Firebase.firestore.collection("pets").doc(uid).update({
            name
        })
            .then(() => {
                console.log("Pet name added to Firestore!: ", name);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    render() {
        return (
            <Button
                label="Get Started"
                name={this.props.name}
                disabled={this.props.name == "" ? true : false }
                onPress={(event) => this.props.onPress(event, this.props.name, this.addPetNameToFirestore)}
                style={{borderColor: Theme.palette.secondary}}
                full
                primary
            />
        );
    }
}

export default class TextInputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {petName: ""};
    }

    inputPetName = (event, name, onPressStartCallback) => {
        // After the user inputs a name in the text field and presses Start, call this function!
        onPressStartCallback(name);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your pet's name here!"
                    placeholderTextColor = "#777777"
                    autoCapitalize="words"
                    autoFocus={true}
                    onChangeText={(text) => this.setState({petName: text})}
                    defaultValue={this.state.petName}
                />
                {/* The following component appears when there is text in the input field! */}
                <GetStartedButton
                    name={this.state.petName}
                    onPress={this.inputPetName}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    input: {
        fontSize: Theme.typography.header3.fontSize,
        color: Theme.palette.sidebar,
        justifyContent: "center",
        textAlign: "center"
    },
});
