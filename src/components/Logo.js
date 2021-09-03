// @flow
import * as React from "react";
import {StyleSheet, View, Image } from "react-native";

type LogoProps = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class Logo extends React.PureComponent<LogoProps> {

    render(): React.Node {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 250, height: 250 }}
                    source={require('../../assets/PetCareLogo.png')}
                />
            </View>
        );
    }
}

const n = 75;
const d = n * Math.sqrt(2);
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: d * 2,
        height: d * 2
    }
});
