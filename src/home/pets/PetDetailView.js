import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native'
import {Button, RefreshIndicator, Text, Theme} from "../../components";

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'

var height = Dimensions.get('window').height; //full height

export default class PetDetailView extends Component {
  constructor(props)
  {
    super(props);
    
    this.tels = [
      { "id": 1, "name": "Office", "number": "+1 (305)-928-2134" },
      { "id": 2, "name": "Work", "number": "+1 (305)-435-9887" }
    ];
    this.emails = [
      { "id": 1, "name": "Personal", "email": "petcare@gmail.com" },
      { "id": 2, "name": "Work", "email": "customersupport@petcare.com" }
    ];
    this.state = {
      loading: true,
      avatar: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg",
      avatarBackground: "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg", 
      name: null,
      breed: null,
      weight: null,
      yearsOwned: null,
      species: null,
      sex: null,
      age: null,
      size: null,
      activity: null,
      classification: null,
      spayNeuter_Status: null,
      pregnancy: null,
      lactating: null,
      petBiology: {"species": "Miami", "breed": "Florida"},
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
          avatar: doc.data().pic,
          avatarBackground: doc.data().pic,
          name: doc.data().name,
          breed: doc.data().breed,
          weight: doc.data().weight,
          yearsOwned: doc.data().yearsOwned,
          species: doc.data().species,
          sex: doc.data().sex,
          age: doc.data().age,
          size: doc.data().size,
          activity: doc.data().activity,
          classification: doc.data().classification,
          spayNeuter_Status: doc.data().spayNeuter_Status, 
          pregnancy: doc.data().pregnancy,
          lactating: doc.data().lactating,
        });

        if(doc.data().pic == "null")
        {
          switch (this.state.species) {
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
  goBackToPets() {
    this.props.navigation.goBack();
  }

  @autobind
  goToEditScreen() {
    navigation.navigate("EditScreen", { pet_uid, uid, onGoBack, onEdit:() => this.retrieveFireStorePetDetails(), setLoading:(bool) => this.handleLoading(bool) });
  }

  @autobind
  goToTrainingScreen() {
    const { breed, species } = this.state;
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
      species, 
      breed
    } = this.state

    return (
      <View>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: avatarBackground}}
        >
          <View style={styles.navContent}>
            <View style={styles.side}>
              <TouchableOpacity onPress={this.goBackToPets}>
                  <View>
                      <Icon name="chevron-left" size={40} color={Theme.palette.black} />
                  </View>
              </TouchableOpacity>
            </View>
            <View style={styles.side}>
              <TouchableOpacity onPress={this.goToEditScreen}>
                  <View>
                      <Icon type="font-awesome-5" name="edit" size={20} color={Theme.palette.black} />
                  </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerColumn}>
            <Image
              style={styles.petImage}
              source={{uri: avatar}}
            />
            <Text style={styles.petNameText}>{name}</Text>
            <View style={styles.petSpeciesRow}>
              <View>
                <Icon
                  name="paw"
                  type="font-awesome-5"
                  iconStyle={styles.pawIcon}
                />
              </View>
              <Text style={styles.petSpeciesText}>
                {species}, {breed}
              </Text>
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
        <ScrollView>
          <View style={{
              paddingTop: height/2,
              justifyContent:"center",
          }}>
              <RefreshIndicator refreshing />
          </View>
        </ScrollView>
        )
    }
    else {
    return (
      <ScrollView persistentScrollbar={false} >

        {this.renderHeader()}

        <View style={styles.infoContainer}>

          <View style={{paddingBottom: 10}}>
            <Text type="header3" style={styles.petText}> Pet Information </Text>
            <Text> Age Group: {this.state.age}</Text>
            <Text> Size: {this.state.size}</Text>
            <Text> Weight (kg): {this.state.weight}</Text>
            <Text> Level of Activty: {this.state.activity}</Text>
            <Text> Years Owned: {this.state.yearsOwned}</Text>
            <Text> Living Space: {this.state.classification}</Text>
            <Text> Spayed/Neutered Status: {this.state.spayNeuter_Status}</Text>
            {this.state.sex === "Female" && this.state.spayNeuter_Status === "Intact" && 
            <Text> Duration of Pregnancy: {this.state.pregnancy}</Text>
            }
            {this.state.sex === "Female" && this.state.spayNeuter_Status === "Intact" && this.state.pregnancy !== null && this.state.pregnancy !== "Not Pregnant" &&
            <Text> Duration of Lactation: {this.state.lactating}</Text>
            }
          </View>

          {Separator()}

          <Text type="header3" style={styles.petText}> Veterinary Contact Information </Text>
          {this.renderTel()}

          {Separator()}

          {this.renderEmail()}

          {Separator()}

          <View style={styles.buttonContent}>
            <View style={styles.buttonContainer}>
              <Button label={"View Training Videos on " + this.state.breed + "'s"} 
                      style="primary" onPress={this.goToTrainingScreen}/>
            </View>

            <View style={styles.buttonContainer}>
              <Button label={"View Lab Documents for " + this.state.name} 
                      style="primary" onPress={this.goToLabResults}/>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button label={"View Prescriptions for " + this.state.name} 
                      style="primary" onPress={this.goToPrescription}/>
            </View>

            <View style={styles.buttonContainer}>
              <Button label={"View Recommended Diet for " + this.state.name} 
                      style="primary" onPress={this.goToDiet}/>
            </View>
          </View>

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
  infoContainer: {
    backgroundColor: Theme.palette.white,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection:"row", 
    justifyContent:"center", 
    marginBottom: 15
  },
  buttonContent: {
    marginTop: 20,
    marginBottom: 15
  },
  petText: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  emailContainer: {
    backgroundColor: Theme.palette.white,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerColumn: {
    backgroundColor: Theme.palette.transparent,
    alignItems: 'center',
  },
  navContent: {
    height: 57,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
},
  pawIcon: {
    color: Theme.palette.white,
    fontSize: 26,
    paddingRight: 5,
  },
  telContainer: {
    backgroundColor: Theme.palette.white,
    paddingTop: 30,
  },
  petSpeciesRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  petSpeciesText: {
    color: Theme.palette.washedBlue,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  petImage: {
    borderColor: Theme.palette.white,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  petNameText: {
    color: Theme.palette.white,
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})