// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import { TextField, Switch, Theme, Text } from "../components";
import type { NavigationProps } from "../components/Types";
import SignUpStore from "./SignUpStore";
import SignUpContainer from "./SignUpContainer";
import DropDownPicker from 'react-native-dropdown-picker';

type RoleState = {
    role: string
};

export default class Role extends React.Component<NavigationProps<*>, RoleState> {

    state = {
        role: "Patient"
    };


    @autobind
    setRole(role: string) {
        this.setState({ role: role });
    }

    @autobind
    next() {
        const { role } = this.state;
        if (role === "") {
            // eslint-disable-next-line
            alert("Please provide your role.");
        } else {
            SignUpStore.role = role;
            this.props.navigation.navigate("SignUpPassword");
        }
    }

    render(): React.Node {
        const { navigation } = this.props;
        return (
            <SignUpContainer title="Your Role" subtitle="" next={this.next} {...{ navigation }}>
                <DropDownPicker
                    items={[
                        { label: 'Veterinarian', value: 'v' },
                        { label: 'Patient', value: 'p' },
                    ]}
                    defaultIndex={0}
                    containerStyle={{height: 40, marginBottom: 80}}
                    onChangeItem={this.setRole }
                />
            </SignUpContainer>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        flexWrap: "wrap",
        marginLeft: Theme.spacing.small,
        flex: 1
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: Theme.spacing.tiny
    }
});
