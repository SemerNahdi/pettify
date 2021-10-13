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
import { Content } from "native-base";
import ProfileStore from "../ProfileStore";
 
import { Text, Avatar, Container, Theme, NavHeaderWithButton } from "../../components";
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
      <NavHeaderWithButton title="Profile" buttonFn={this.settings} buttonIcon="settings" />
      <Container gutter={1} style={styles.container}>
        <Content scrollEnabled={false}>
          <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1, marginBottom: 12}}>
            <Avatar
              size={avatarSize}
              style={styles.avatar}
              {...profile.picture}
            />
          </View>
          <View>
            <View style={styles.informationContainer}>
              <Text style={styles.header}>Name</Text>
              <Text style={styles.information}>{profile.name}</Text>
            </View>   
          </View>
          <View style={styles.separator}/>
          <View style={styles.informationContainer}>
            <Text style={styles.header}>Email</Text>
            <Text style={styles.information}>{profile.email}</Text>
          </View>
        </Content>
      </Container>
      </>
    );
  }
}
 
const avatarSize = 120;
const { width, height } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 20,
  },
  separator: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 80,
    marginBottom: 4,
    marginTop: 4,
  },
  header: {
    color: Theme.palette.black,
    width: 75,
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'left',
  },
  information: {
    color: Theme.palette.black,
    fontSize: 16,
    lineHeight: 16,
    textAlign: 'left',
  },
  informationContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      marginLeft: 8,
      marginTop: 8,
      marginBottom: 8,
  },
});
 