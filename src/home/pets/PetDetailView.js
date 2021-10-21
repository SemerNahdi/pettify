import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React, { Component, useState } from 'react'
import { Card, Icon, Overlay, Badge } from 'react-native-elements'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {Text, Theme} from "../../components";

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'
import { reduce } from "lodash";
import darkColors from "react-native-elements/dist/config/colorsDark";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class PetDetailView extends Component {
  constructor(props)
  {
    super(props);

    this.avatar = "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg";
    this.avatarBackground = "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg";
    this.name = "Gina Mahdi"
    this.address = {"city": "Miami", "country": "Florida"};
    this.tels = [
      { "id": 1, "name": "Office", "number": "+1 (305)-928-2134" },
      { "id": 2, "name": "Work", "number": "+1 (305)-435-9887" }
    ];
    this.emails = [
      { "id": 1, "name": "Personal", "email": "petcare@gmail.com" },
      { "id": 2, "name": "Work", "email": "customersupport@petcare.com" }
    ];
    this.state = {
      petDetails: "",
      loading: true,
      imagePath: require("../../../assets/PetCare.png"),
      isLoading: false,
      status: '',
      avatar: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg",
      avatarBackground: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg", 
      name: "Gina Mahdi",
      petBiology: {"species": "Miami", "breed": "Florida"},
      setOverlay: false,
    };
      
    navigation = this.props.navigation;
    uid = navigation.state.params.uid;
    pet_uid  = navigation.state.params.pet_uid;
    onGoBack = navigation.state.params.onGoBack;

    this.retrieveFireStorePetDetails();
  }

  @autobind
  retrieveFireStorePetDetails() {
    Firebase.firestore
    .collection("users")
    .doc(uid)
    .collection("pets")
    .doc(pet_uid)
    .get()
    .then(doc => {
        this.setState({
          petDetails: doc.data(), 
          name: doc.data().name,
          age: doc.data().age,
          yearsOwned: doc.data().yearsOwned,
          weight: doc.data().weight,
          activity: doc.data().activity,
          size: doc.data().size,
          pregnancy: doc.data().pregnancy,
          lactating: doc.data().lactating,
          classification: doc.data().classification,
          spayNeuter_Status: doc.data().spayNeuter_Status, 
          petBiology: {"species" : doc.data().species, "breed" : doc.data().breed},
          avatar: doc.data().pic,
          avatarBackground: doc.data().pic,
        });

        if(doc.data().pic == "null")
        {
          switch (this.state.petDetails.species) {
              case "Cat":
                this.setState({
                  avatar: "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg",
                  avatarBackground: "https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg"
                })
                break;
              case "Dog":
                this.setState({
                  avatar: "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg",
                  avatarBackground: "https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg"
                })
                break;
              case "Bird":
                this.setState({
                  avatar: "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png",
                  avatarBackground: "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png"
                })
                break;
              case "Horse":
                this.setState({
                  avatar: "https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  avatarBackground: "https://images.pexels.com/photos/2123375/pexels-photo-2123375.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                })
                break;
              case "Fish":
                this.setState({
                  avatar: "https://i.guim.co.uk/img/media/9c03bd43c119834ece958f3c370dec83146fe04a/0_200_6000_3602/master/6000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=de1abf11d1a7a961d5fea63f5a8bee55",
                  avatarBackground: "https://i.guim.co.uk/img/media/9c03bd43c119834ece958f3c370dec83146fe04a/0_200_6000_3602/master/6000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=de1abf11d1a7a961d5fea63f5a8bee55"
                })
                break;
              case "Exotic":
                this.setState({
                  avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Male_Green_Iguana_Belize.jpg/220px-Male_Green_Iguana_Belize.jpg",
                  avatarBackground: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Male_Green_Iguana_Belize.jpg/220px-Male_Green_Iguana_Belize.jpg"
                })
                break;
              default:
                this.setState({
                  avatar: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
                  avatarBackground: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
                })
                break;
            }
          }
          this.setState({loading: false})
    })
  }

  handleLoading = (bool) => {
    this.setState({loading: bool})
  }

  @autobind
  toggleOverlay() {
    this.setState({"setOverlay":!this.state.setOverlay});
  }

  @autobind
  goBackToPets() {
    this.props.navigation.goBack();
  }

  @autobind
  goToEditScreen() {
    navigation.navigate("EditScreen", { pet_uid, uid, onGoBack, onEdit:() => this.retrieveFireStorePetDetails(), setLoading:(bool) => this.handleLoading(bool) });
  }

  @autobind
  goToTrainingScreen() {
    const { breed, species } = this.state.petBiology;
    navigation.navigate("TrainingScreen", {breed, species});
  }

  @autobind
  goToLabResults() {
    navigation.navigate("ViewDocuments", { pet_uid, uid });
  }

  @autobind
  goToPrescription() {
    navigation.navigate("PetPrescription", { pet_uid, uid });
  }

  @autobind
  goToDiet() {
    navigation.navigate("PetDiet", { pet_uid, uid });
  }
  
  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      petBiology: { species, breed },
    } = this.state

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: avatarBackground}}
        >
          <View style={styles.navContent}>
            <View style={styles.side}>
              <TouchableOpacity onPress={this.goBackToPets}>
                  <View>
                      <Icon name="chevron-left" size={50} color="white" />
                  </View>
              </TouchableOpacity>
            </View>
            <View style={styles.side}>
              <TouchableOpacity onPress={this.goToEditScreen}>
                  <View>
                      <Icon type="font-awesome-5" name="edit" size={40} color="white" />
                  </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{uri: avatar}}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="paw"
                  underlayColor="transparent"
                  type="font-awesome-5"
                  iconStyle={styles.placeIcon}
                  onPress={this.toggleOverlay}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {species}, {breed}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderTel() {
    index = 0
    return(
      <View style={styles.telContainer}>
        {this.tels.map(tel => (
          <Tel
          key={tel.id}
          index={index++}
          name={tel.name}
          number={tel.number}
          onPressSms={this.onPressSms}
          onPressTel={this.onPressTel}
          />
        ))}
      </View>
    )
  }

  renderEmail() {
    index = 0
    return (
      <View style={styles.emailContainer}>
        {this.emails.map(email => (
          <Email
          key={email.id}
          index={index++}
          name={email.name}
          email={email.email}
          onPressEmail={this.onPressEmail}
        />
        ))}
      </View>
    )
  }

  render():React.Node {
    if(this.state.loading)
    {
        return(
        <ScrollView style={[styles.container]}>
          <View style={{
              paddingTop: "40%",
              justifyContent:"center",
          }}>
              <ActivityIndicator size="large" />
          </View>
        </ScrollView>
        )
    }
    else {
    return (
      <ScrollView contentContainerStyle={styles.scroll} persistentScrollbar={false} >
        <View style={styles.container}>
        {this.renderHeader()}
          <Card containerStyle={styles.cardContainer}>
            <View style={{
              paddingBottom: 10,
            }}>
              <Text type="header3" style={styles.cardText}> Pet Information </Text>
              <Text> Age Group: {this.state.age}</Text>
              <Text> Size: {this.state.size}</Text>
              <Text> Weight (kg): {this.state.weight}</Text>
              <Text> Level of Activty: {this.state.activity}</Text>
              <Text> Years Owned: {this.state.yearsOwned}</Text>
              <Text> Living Space: {this.state.classification}</Text>
              <Text> Spayed/Neutered Status: {this.state.spayNeuter_Status}</Text>
              <Text> Duration of Pregnancy: {this.state.pregnancy}</Text>
              <Text> Duration of Lactation: {this.state.lactating}</Text>
            </View>
            {Separator()}
            <Text type="header3" style={styles.cardText}> Veterinary Contact Information </Text>
            {this.renderTel()}
            {Separator()}
            {this.renderEmail()}
          </Card>
          <View style={styles.labContainer}>
            
            <TouchableOpacity
              style={styles.labButton}
              onPress={this.goToTrainingScreen}
            >
                <Text>
                  View Training Videos on {this.state.petDetails.breed}s
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.labButton}
              onPress={this.goToLabResults}
            >
                <Text>
                  View Lab Results for {this.state.petDetails.name}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.labButton}
              onPress={this.goToPrescription}
            >
                <Text>
                  View Prescriptions for {this.state.petDetails.name}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.labButton}
              onPress={this.goToDiet}
            >
                <Text>
                  View Recommended Diet for {this.state.petDetails.name}
                </Text>
            </TouchableOpacity>
          </View>

          
          <View style={{height:60}}/>
        </View>
      </ScrollView>
    )
    }
  }
}

const styles = StyleSheet.create({
  side: {
      width: 80,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    paddingTop: 10,
  },
  cardText: {
    flexDirection: "row",
    alignSelf: "center",
  },
  overlayContainer: {
    backgroundColor: '#FFF',
    width: width - 100,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  labButton:{
    backgroundColor: '#9dffb0',
    alignSelf: 'center',
    padding: 10,
    marginTop: 20
  },
  labContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
  },
  navContent: {
    marginTop: Platform.OS === "ios" ? 0 : 20,
    height: 57,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
  placeIcon: {
    color: 'white',
    fontSize: 26,
    paddingRight: 5,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})