// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Content } from "native-base";
import { Feather as Icon } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";

import {
    NavHeader,
    Firebase,
    Button,
    Text,
    TextField,
    Theme,
    ImageUpload,
    serializeException,
    RefreshIndicator,
} from "../../components";

import EnableCameraRollPermission from "./EnableCameraRollPermission";

import type { ScreenParams } from "../../components/Types";
import type { Profile } from "../../components/Model";
import type { Picture } from "../../components/ImageUpload";

type SettingsState = {
    name: string,
    picture: Picture,
    loading: boolean,
    hasCameraRollPermission: boolean | null,
};

export default class Settings extends React.Component<ScreenParams<{ profile: Profile }>, SettingsState> {
    state = {
        name: "",
        picture: {
            uri: "",
            width: 0,
            height: 0,
        },
        loading: false,
        hasCameraRollPermission: null,
        address: "",
        email: "",
    };

    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
        const { profile } = navigation.state.params;
        const picture = {
            uri: profile.picture.uri,
            height: 0,
            width: 0,
        };
        this.setState({
            name: profile.name,
            address: profile.address,
            email: profile.email,
            picture,
            loading: false,
            hasCameraRollPermission: null
        });
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status === "granted" });
    }

    @autobind
    async save(): Promise<void> {
        const { navigation } = this.props;
        const originalProfile = navigation.state.params.profile;
        const { name, picture, address, email } = this.state;
        const { uid } = Firebase.auth.currentUser;
        this.setState({ loading: true });
        try {
            if (name !== originalProfile.name) {
                await Firebase.firestore.collection("users").doc(uid).update({ name });
            }
            if (address !== originalProfile.address) {
                await Firebase.firestore.collection("users").doc(uid).update({ address });
            }
            if (email !== originalProfile.email) {
                await Firebase.firestore.collection("users").doc(uid).update({ email });
            }
            if (picture.uri !== originalProfile.picture.uri) {
                const preview = await ImageUpload.preview(picture);
                const uri = await ImageUpload.upload(picture);
                await Firebase.firestore.collection("users").doc(uid).update({ picture: { preview, uri } });
            }
            navigation.pop();
        } catch (e) {
            const message = serializeException(e);
            // eslint-disable-next-line no-alert
            alert(message);
            this.setState({ loading: false });
        }
    }

    @autobind
    async setPicture(): Promise<void> {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (result.cancelled === false) {
            const { uri, width, height } = result;
            const picture: Picture = {
                uri,
                width,
                height,
            };
            this.setState({ picture });
        }
    }

    @autobind
    async deleteUser(): Promise<void> {
        const user = Firebase.auth.currentUser;
        Firebase.firestore.collection("users").doc(user.uid).delete().then(() => {
            user.delete().catch((error) => {
                console.error("Error deleting account: ", error);
            });
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        this.props.navigation.navigate("Welcome");
    }

    @autobind
    setName(name: string) {
        this.setState({ name });
    }

    @autobind
    setEmail(email: string) {
        this.setState({ email });
    }

    @autobind
    setAddress(address: string) {
        this.setState({ address });
    }

    render(): React.Node {
        const { navigation } = this.props;
        const { name, picture, loading, hasCameraRollPermission, address, email } = this.state;
        if (hasCameraRollPermission === null) {
            return (
                <View style={styles.refreshContainer}>
                    <RefreshIndicator refreshing />
                </View>
            );
        } else if (hasCameraRollPermission === false) {
            return <EnableCameraRollPermission />;
        }
        return (
            <View style={styles.container}>
                <NavHeader title="Settings" back backFn={() => this.props.navigation.goBack()} {...{ navigation }}/>
                <Content style={styles.content}>
                    <View style={styles.avatarContainer}>
                        <TouchableWithoutFeedback onPress={this.setPicture}>
                            <View style={styles.avatar}>
                                <Image style={styles.profilePic} source={{ uri: picture.uri }} />
                                <Icon name="camera" size={25} color="white" style={styles.editIcon} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={styles.header}>Name</Text>
                    <TextField
                        placeholder="Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="go"
                        defaultValue={name}
                        onSubmitEditing={this.save}
                        onChangeText={this.setName}
                        style={styles.trial}
                    />
                    <View style={styles.separator}/>
                    <Text style={styles.header}>Email</Text>
                    <TextField
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="go"
                        defaultValue={email}
                        onSubmitEditing={this.save}
                        onChangeText={this.setEmail}
                        style={styles.trial}
                    />
                    <View style={styles.separator}/>
                    <Text style={styles.header}>Address</Text>
                    <TextField
                        placeholder="Address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="go"
                        defaultValue={address}
                        onSubmitEditing={this.save}
                        onChangeText={this.setAddress}
                        style={styles.trial}
                    />
                    <View style={styles.separator}/>
                    <Button label="Save" full onPress={this.save} {...{ loading }} style="primary" />
                    <Button label="Sign Out" full onPress={logout} style="base"/>
                    <Button label="Delete Account" full onPress={this.deleteUser} style="base" color="#ff5c5c"/>
                </Content>
            </View>
        );
    }
}

const logout = () => Firebase.auth.signOut();
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    content: {
        marginHorizontal: Theme.spacing.base,
    },
    refreshContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarContainer: {
        alignItems: "center",
    },
    avatar: {
        marginVertical: Theme.spacing.base,
        alignItems: "center",
        height: 100,
        width: 100,
    },
    profilePic: {
        position: "absolute",
        top: 0,
        left: 0,
        height: 100,
        width: 100,
        resizeMode: "cover",
        borderRadius: 50,
    },
    editIcon: {
        position: "absolute",
        top: 50 - 12.5,
        left: 50 - 12.5,
    },
    separator: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        alignSelf: 'flex-start',
        width: '100%',
        marginBottom: 20,
    },
    header: {
        fontWeight: "900",
        color: "black",
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 4,
    },
    informationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginTop: 8,
        marginBottom: 8,
    },
    trial: {
        marginLeft: 4,
        width: "100%",
    },
});
