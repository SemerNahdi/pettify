// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import { observer } from "mobx-react";
import Constants from "expo-constants";
import { Content } from "native-base";
 
import { Firebase, Text, Avatar, Container, Theme, NavHeaderWithButton } from "../../components";
import type { ScreenProps } from "../../components/Types";
 
@observer
export default class ProfileComp extends React.Component<
ScreenProps<> & InjectedProps
> {
 
  constructor(props){
    super(props);
    this.state = {
      profile: [],
    };
    this.retireveProfile();
  }

  retireveProfile() {
    const user = Firebase.auth.currentUser;
    Firebase.firestore.collection("users").doc(user.uid).get().then(docs => {
      prof = docs.data();
      // For users that don't have email in firestore, can be removed later
      if (prof.email == null) {
        Firebase.firestore.collection("users").doc(user.uid).update({email: user.email});
        prof.email = user.email;
      }
      this.setState({profile: prof});
    });
  }

  @autobind
  settings() {
    const profile = this.state.profile;
    this.props.navigation.navigate("Settings", { profile });
  }
 
  render(): React.Node {
    const { navigation } = this.props;
    prof = this.state.profile;
    return (
      <>
      <NavHeaderWithButton title="Profile" buttonFn={this.settings} buttonIcon="settings" />
      <Container gutter={1} style={styles.container}>
        <Content scrollEnabled={false}>
          <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1, marginBottom: 12}}>
            <Avatar
              size={avatarSize}
              style={styles.avatar}
              {...prof.picture}
            />
          </View>
          <View>
            <View style={styles.informationContainer}>
              <Text style={styles.header}>Name</Text>
              <Text style={styles.information}>{prof.name}</Text>
            </View>   
          </View>
          <View style={styles.separator}/>
          <View style={styles.informationContainer}>
            <Text style={styles.header}>Email</Text>
            <Text style={styles.information}>{prof.email}</Text>
          </View>
          <View style={styles.separator}/>
          <View style={styles.informationContainer}>
            <Text style={styles.header}>Address</Text>
            <Text style={styles.information}>{prof.address}</Text>
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
 