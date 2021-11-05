// @flow
import * as _ from "lodash";
import * as React from "react";
import {TextInput, StyleSheet} from "react-native";

import { Theme } from "./Theme";

type TextFieldProps = {
    textInputRef?: (TextInput) => void,
    secureTextEntry?: boolean
};

export class TextField extends React.Component<TextFieldProps> {

    render(): React.Node {
        const {textInputRef, secureTextEntry} = this.props;
        const keysToFilter = ["contrast", "label", "textInputRef"];
        const props = _.pickBy(this.props, (value, key) => keysToFilter.indexOf(key) === -1);
        return (
            <TextInput
                secureTextEntry={secureTextEntry}
                ref={textInputRef}
                style={styles.textInput}
                placeholderTextColor={Theme.typography.black}
                {...props}
                underlineColorAndroid="transparent"
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: Theme.palette.borderColor,
        borderWidth: 2,
        borderRadius: 30,
        ...Theme.typography.regular,
        color: Theme.typography.color,
        padding: Theme.spacing.small,
        marginBottom: Theme.spacing.base,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.03,
        shadowRadius: 1,
        width: "100%"
        
    }
});
