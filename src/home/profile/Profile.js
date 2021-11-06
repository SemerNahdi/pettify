// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Content } from "native-base";
 
import { Firebase, Text, Container, Theme, NavHeaderWithButton } from "../../components";

export default class ProfileComp extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      profile: [],
      //picture is only needed until all users have a pic field in Firease database
      picture: "temp"
    };
    this.retrieveProfile();
  }

  retrieveProfile = () => {
    const user = Firebase.auth.currentUser;
    Firebase.firestore.collection("users").doc(user.uid).get().then(docs => {
      prof = docs.data();
      // For users that don't have email in firestore, can be removed later
      if (prof.email == null) {
        Firebase.firestore.collection("users").doc(user.uid).update({email: user.email});
        prof.email = user.email;
      }
      this.setState({profile: prof});
      //this is also only temporary until all profiles have a pic field 
      this.setState({picture: prof.pic ? prof.pic : prof.picture.uri})
      //this will slowly give everyone a pic field with the same picture they already have
      if(prof.picture && !prof.pic)
      {
        Firebase.firestore.collection("users").doc(user.uid).update({pic : prof.picture.uri})
      }
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
      <>
      <NavHeaderWithButton title="Profile" buttonFn={this.settings} buttonIcon="settings" />
      <Container gutter={1} style={styles.container}>
        <Content scrollEnabled={false}>
          <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1, marginBottom: 12}}>
          <Image
                source={{ uri: this.state.picture }}
                style={styles.avatar}
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
    borderRadius: 85,
    height: 120,
    width: 120,
    marginBottom: 20,
    alignSelf: "center"
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
 