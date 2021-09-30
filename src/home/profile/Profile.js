// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { inject, observer } from "mobx-react";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
 
import ProfileStore from "../ProfileStore";
 
import { Text, Avatar, Theme, NavHeaderWithButton, Button } from "../../components";
import type { ScreenProps } from "../../components/Types";
 
type InjectedProps = {
  profileStore: ProfileStore
};
 
@inject("profileStore")
@observer
export default class ProfileComp extends React.Component<
ScreenProps<> & InjectedProps
> {
 
  @autobind
  settings() {
    const { profile } = this.props.profileStore;
    this.props.navigation.navigate("Settings", { profile });
  }
 
  render(): React.Node {
    const { profileStore, navigation } = this.props;
    const { profile } = profileStore;
    return (
      <>
        <View style={styles.container}>
          <NavHeaderWithButton title="Profile" buttonFn={this.settings} buttonIcon="settings" />
          <LinearGradient
            colors={["#ffffff", "#ffffff"]}
            style={styles.gradient}
          />
          <View style={styles.header}>
            <View style={styles.title}>
              <Text type="header2" style={styles.name}>{profile.name}</Text>
            </View>
            <Avatar
              size={avatarSize}
              style={styles.avatar}
              {...profile.picture}
            />
          </View>
        </View>
      </>
    );
  }
}
 
const avatarSize = 150;
const { width, height } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    marginBottom: avatarSize * 0.5 + Theme.spacing.small,
  },
  avatar: {
    position: "absolute",
    alignSelf: "center",
    top: statusBarHeight + Theme.spacing.xLarge,
  },
  title: {
    position: "absolute",
    alignSelf: "center",
    top: 175 + statusBarHeight + Theme.spacing.xLarge,
  },
  name: {
    color: Theme.palette.black,
  },
  button: {
    paddingTop: 250,
  }
});
 