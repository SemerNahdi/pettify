// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {TextInput} from "react-native";

import {TextField} from "../components";
import type {NavigationProps} from "../components/Types";

import SignUpStore from "./SignUpStore";
import SignUpContainer from "./SignUpContainer";

type NameState = {
    firstName: string,
    lastName: string,
    address: string
};

export default class Name extends React.Component<NavigationProps<*>, NameState> {

    lastName: TextInput;
    address: TextInput;

    state = {
        firstName: "",
        lastName: "",
        address: ""
    };

    @autobind
    setFirstName(firstName: string) {
        this.setState({ firstName });
    }

    @autobind
    setLastName(lastName: string) {
        this.setState({ lastName });
    }

    @autobind
    setaddress(address: string) {
        this.setState({ address });
    }

    @autobind
    setLastNameRef(input: TextInput) {
        this.lastName = input;
    }

    @autobind
    setaddresseRef(input: TextInput) {
        this.address = input;
    }

    @autobind
    goToLastName() {
        this.lastName.focus();
    }

    @autobind
    goToAddress(){
        this.address.focus();
    }

    @autobind
    next() {
        const {firstName, lastName, address} = this.state;
        if (firstName === "") {
            // eslint-disable-next-line no-alert
            alert("Please provide a first name.");
        } else if (lastName === "") {
            // eslint-disable-next-line no-alert
            alert("Please provide a last name.");
        } else if (address === "") {
            // eslint-disable-next-line no-alert
            alert("Please provide an address");
        } else {
            SignUpStore.displayName = `${firstName} ${lastName} `;
            SignUpStore.displayAddress = `${address}`;
            this.props.navigation.navigate("SignUpEmail");
        }

    }

    render(): React.Node {
        const {navigation} = this.props;
        return (
            <SignUpContainer title="Your Info" subtitle="Get Started" next={this.next} first {...{navigation}}>
                <TextField
                    placeholder="First Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={this.goToLastName}
                    onChangeText={this.setFirstName}
                />
                <TextField
                    placeholder="Last Name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    textInputRef={this.setLastNameRef}
                    onSubmitEditing={this.next}
                    onChangeText={this.setLastName}
                />
                <TextField
                    placeholder="Address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    textInputRef={this.setaddressRef}
                    onSubmitEditing={this.next}
                    onChangeText={this.setaddress}
                />
            </SignUpContainer>
        );
    }
}
