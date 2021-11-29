import autobind from "autobind-decorator";
import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Content, Right } from "native-base";
 
import { Firebase, Text, Container, Theme, NavHeaderWithButton } from "../../components";
import { ImageBackground } from "react-native";

export default class ProfileComp extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      profile: [],
    };
    this.retrieveProfile();
  }

  retrieveProfile = () => {
    const user = Firebase.auth.currentUser;
    Firebase.firestore.collection("users").doc(user.uid).get().then(docs => {
      prof = docs.data();
      this.setState({profile: prof});
    });
  }

  @autobind
  settings() {
    const profile = this.state.profile;
    this.props.navigation.navigate("Settings", { profile, onSubmit:() => this.retrieveProfile() });
  }
 
  render(): React.Node {
    const { navigation } = this.props;
    prof = this.state.profile;
    return (
      <ImageBackground source={require('../../../assets/pattern.png')} style={styles.container}>
      <NavHeaderWithButton title="Profile" buttonFn={this.settings} buttonIcon="settings" />
          <View style={styles.contentcontainer}>
          <Image
                source={{ uri: prof.pic }}
                style={styles.avatar}
                />   
          <View>
            <View style={styles.informationContainer}>
              <Text style={styles.information}>Name:        {prof.name}</Text>
            </View>   
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.information}>Email:         {prof.email}</Text>
          </View>
          <View style={styles.informationContainer}>
            <Text style={styles.information}>Address:    {prof.address}</Text>
          </View>
          </View>
      </ImageBackground>
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
    borderRadius: 85,
    height: 120,
    width: 120,
    marginBottom: 10,
    alignSelf: "center"
  },
  information: {
    color: Theme.palette.black,
    fontSize: 16,
    lineHeight: 16,
  },
  informationContainer: {
    paddingRight:20,
    paddingLeft:10,
    paddingBottom: 10,
    paddingTop: 10,
    flex: 0,
    margin: 15,
    flexDirection: 'row',    
    backgroundColor:Theme.palette.white,
    opacity:1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: .2,
    shadowRadius: .5,
    borderRadius: 5,
    borderWidth: .3,
    borderColor: Theme.palette.transparent,
   
  },
  contentcontainer: {
    paddingTop: 40,
  }
});
 