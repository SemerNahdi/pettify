import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React from 'react'
import { Card, Icon } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {Text, Button, Theme} from "../../components";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class EditScreen extends React.Component {
  constructor(props)
  {
    super(props);

    this.avatar = "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg";
    this.avatarBackground = "https://i.pinimg.com/originals/bc/78/4f/bc784f866bb59587b2c7364d47735a25.jpg";
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
    };

    navigation = this.props.navigation;
    uid = navigation.state.params.uid;
    pet_uid  = navigation.state.params.pet_uid;

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
      this.setState({loading: false,})
    })
  }

  @autobind
  updateFireStorePetDetails() {
    const { name, age, yearsOwned, sex, classification, spayNeuter_Status, weight, activity, 
            pregnancy, lactating, size, species, breed} = this.state; 

    Firebase.firestore
    .collection("users")
    .doc(uid)
    .collection("pets")
    .doc(pet_uid)
    .update({
      name, age, yearsOwned, sex, classification, spayNeuter_Status, weight, activity, 
      pregnancy, lactating, size, species, breed 
    }).then(() => {
      navigation.state.params.setLoading(true);
      navigation.state.params.onEdit();
      navigation.state.params.onGoBack();
      navigation.goBack();
    });
  }

  chooseFile = async () => {
    this.setState({loading: true});
    let result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled) {
      this.setState({loading: false});
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else if (result.customButton) {
      console.log('User tapped custom button: ', result.customButton);
    } else {
      let path = result.uri;
      let imageName = path.split("/").pop();
      const response = await fetch(path);
      const blob = await response.blob();

      Firebase.storage.ref().child("petPictures/" + imageName).put(blob)
      .then(() => {
        Firebase.storage.ref().child("petPictures/" + imageName).getDownloadURL()
        .then((pic) => {
              Firebase.firestore
                .collection("users")
                .doc(uid)
                .collection("pets")
                .doc(pet_uid)
                .update({pic})
                .then(() => {
                  this.retrieveFireStorePetDetails()
                  navigation.state.params.setLoading(true);
                  navigation.state.params.onEdit();
                  navigation.state.params.onGoBack();
                  this.setState({loading: false})
                })
          });
      }).catch((e) => {
          console.log('uploading image error => ', e);
          this.setState({ loading: false });
      });
    }
  }

  @autobind
  goBackToPets() {
    navigation.goBack();
  }

  @autobind
  deletePet() {
    Alert.alert(
      "Delete pet?",
      "Are you sure you want to delete this pet?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", onPress: () => this.deletingPet(), style:"destructive" }
      ]);
  }

  @autobind
  deletingPet()
  {
    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid)
      .delete()
      .then( () => {
        navigation.state.params.onGoBack();
        navigation.navigate("Pets");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
  }

  setAllClose = () => {
    this.setState({ageOpen: false})
    this.setState({sizeOpen: false})
    this.setState({activityOpen: false})
    this.setState({pregnancyOpen: false})
    this.setState({lactatingOpen: false})
  }

  @autobind
  updateSpecies(species) {
    this.setState({species: species})
  }

  updateSex(sex) {
    this.setState({sex: sex})   
  }

  setAgeValue = (callback) => {
    this.setState( item => ({
        age: callback(item.label)
    }))
  }

  setSizeValue = (callback) => {
    this.setState( item => ({
        size: callback(item.label)
    }))
  }

  setActivityValue = (callback) => {
    this.setState( item => ({
        activity: callback(item.label)
    }))
  }

  updateClassification(classification) {
    this.setState({classification: classification})
  } 

  updateSpayNeuter_Status(spayNeuter_Status) {
    this.setState({spayNeuter_Status: spayNeuter_Status})
  }

  setPregnancyValue = (callback) => {
    this.setState( item => ({
        pregnancy: callback(item.label)
    }))
  }

  setLactatingValue = (callback) => {
    this.setState( item => ({
        lactating: callback(item.label)
    }))
  }

  handleName = (text) => {
    this.setState({name: text})
  }

  handleBreed = (text) => {
    this.setState({breed: text});
  }

  handleYearsOwned = (text) => {
    this.setState({yearsOwned: text})
  }

  handleWeight = (text) => {
    this.setState({weight: text})
  }

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      species,
      breed,
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
              <TouchableOpacity onPress={this.deletePet}>
                  <View>
                      <Icon type="font-awesome-5" name="trash-alt" size={30} color="#C70000"/>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={this.chooseFile}>
              <Image
                style={styles.userImage}
                source={{uri: avatar}}
              />
                  <Text style={{
                    alignSelf: "center",
                    color: "black",
                    fontSize: 20,
                  }}>Edit Image</Text>
            </TouchableOpacity>
         </View>
        </ImageBackground>
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
          <View style={styles.cardContainer}>
            <Text type="header3" style={styles.cardText}> Edit Information </Text>

            <Text>Name:</Text>
            <TextInput
                style={styles.input}
                onChangeText={this.handleName}
                returnKeyType = 'done'
                defaultValue = {this.state.name}
            /> 

            <Text>Breed:</Text>
            <TextInput
                style={styles.input}
                onChangeText={this.handleBreed}
                returnKeyType = 'done'
                defaultValue = {this.state.breed}
            /> 

            <Text>Weight (kg):</Text>
            <TextInput
                style={styles.input}
                onChangeText={this.handleWeight}
                keyboardType="numeric" 
                returnKeyType = 'done'
                defaultValue={this.state.weight}
            /> 

            <Text>Years Owned:</Text>
            <TextInput
                style={styles.input}
                onChangeText={this.handleYearsOwned}
                keyboardType="numeric" 
                returnKeyType = 'done'
                defaultValue = {this.state.yearsOwned}
            /> 

            <Text>Species:</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => this.updateSpecies("Dog")}>
                <FontAwesome5 name="dog" size={30} color={this.state.species == "Dog" ? "#0080ff" : Theme.palette.washedBlue} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.updateSpecies("Cat")}>
                <FontAwesome5 name="cat" size={30} color={this.state.species == "Cat" ? "#ffb347" : Theme.palette.washedBlue} /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.updateSpecies("Bird")}>
                <FontAwesome5 name="dove" size={30} color={this.state.species == "Bird" ? "#c93335" : Theme.palette.washedBlue} />
              </TouchableOpacity>
            </View>

            <Text>Sex:</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => this.updateSex("Male")}>
                <FontAwesome5 name="mars" size={30} color={this.state.sex == "Male" ? "#009dff" : Theme.palette.washedBlue} /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.updateSex("Female")}>
                <FontAwesome5 name="venus" size={30} color={this.state.sex == "Female" ? "#e75480" : Theme.palette.washedBlue} /> 
              </TouchableOpacity>
              
            </View>

            <Text>Age Group:</Text>
            <DropDownPicker 
              placeholder="Select age group"
              value={this.state.age}
              items={[{label: '0 - 1 Months', value: '0 - 1 Months'}, {label: '1 - 4 Months', value: '1 - 4 Months'},{label: '4 - 8 Months', value: '4 - 8 Months'},{label: 'Adult', value: 'Adult'}]}
              open={this.state.ageOpen}
              setOpen={(open) => { this.setAllClose(); this.setState({ageOpen: open}) } }
              setValue={this.setAgeValue}
              listMode="SCROLLVIEW"
              zIndex={5}
              style={styles.dropdown}
            />

            <Text>Size:</Text>
            <DropDownPicker 
              placeholder="Select size"
              value={this.state.size}
              items={[{label: 'Small', value: 'Small'}, {label:'Medium', value: 'Medium'},{label:'Large', value: 'Large'},{label:'X-Large', value: 'X-Large'}]}
              open={this.state.sizeOpen}
              setOpen={(open) => { this.setAllClose(); this.setState({sizeOpen: open}) } }
              setValue={this.setSizeValue}
              listMode="SCROLLVIEW"
              zIndex={4}
              style={styles.dropdown}
            />

            <Text>Activity Level:</Text>
            <DropDownPicker 
              placeholder="Select activity level"
              value={this.state.activity}
              items={[{label: 'Inactive', value: 'Inactive'}, {label: 'Mild', value: 'Mild'},{label: 'Moderate', value: 'Moderate'},{label: 'High', value: 'High'}]}
              open={this.state.activityOpen}
              setOpen={(open) => { this.setAllClose(); this.setState({activityOpen: open}) } }
              setValue={this.setActivityValue}
              listMode="SCROLLVIEW"
              zIndex={3}
              style={styles.dropdown}
            />

            <Text>Living Space:</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => this.updateClassification("Indoors")}>
                <FontAwesome5 name="home" size={30} color={this.state.classification == "Indoors" ? "#71b6f7" : Theme.palette.washedBlue} /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.updateClassification("Outdoors")}>
                <FontAwesome5 name="tree" size={30} color={this.state.classification == "Outdoors" ? "#0dbf0d" : Theme.palette.washedBlue} /> 
              </TouchableOpacity>
            </View>

            <Text>Spayed/Neutered Status:</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={() => this.updateSpayNeuter_Status("Spayed/Neutered")}>
                <FontAwesome5 name="check" size={30} color={this.state.spayNeuter_Status == "Spayed/Neutered" ? "#0dbf0d" : Theme.palette.washedBlue} /> 
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.updateSpayNeuter_Status("Intact")}>
                <FontAwesome5 name="ban" size={30} color={this.state.spayNeuter_Status == "Intact" ? "#c93335" : Theme.palette.washedBlue} /> 
              </TouchableOpacity>
            </View>

            <Text>Duration of Pregnancy:</Text>
            <DropDownPicker 
              placeholder="Select duration of pregnancy"
              value={this.state.pregnancy}
              items={[{label: 'Not Pregnant', value: 'Not Pregnant'}, {label: '0 - 5 Weeks', value: '0 - 5 Weeks'},{label: '5 - 10 Weeks', value: '5 - 10 Weeks'}, {label: '10+ Weeks', value: '10+ Weeks'}]}
              open={this.state.pregnancyOpen}
              setOpen={(open) => { this.setAllClose(); this.setState({pregnancyOpen: open}) } }
              setValue={this.setPregnancyValue}
              listMode="SCROLLVIEW"
              zIndex={2}
              style={styles.dropdown}
            />

            <Text>Duration of Lactation:</Text>
            <DropDownPicker 
              placeholder="Select duration of lactation"
              value={this.state.lactating}
              items={[{label: 'Non Lactating', value: 'Non Lactating'}, {label: '0 - 1 Weeks', value: '0 - 1 Weeks'},{label: '1 - 3 Weeks', value: '1 - 3 Weeks'}, {label: '3+ Weeks', value: '3+ Weeks'}]}
              open={this.state.lactatingOpen}
              setOpen={(open) => { this.setAllClose(); this.setState({lactatingOpen: open}) } }
              setValue={this.setLactatingValue}
              listMode="SCROLLVIEW"
              zIndex={1}
              style={styles.dropdown}
            />

            <View style={styles.buttonView}>
              <Button label="Submit Changes" onPress={this.updateFireStorePetDetails} style="secondary"/>
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
  cardContainer: {
    paddingTop: 10,
    paddingHorizontal: 8
  },
  cardText: {
    flexDirection: "row",
    alignSelf: "center",
  },
  container: {
    flex: 1,
  },
  dropdown: {
    marginVertical: 3
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerColumn: {
    backgroundColor: 'transparent',
    alignItems: "center"
  },
  input: {
    height: 30,
    margin: 2,
    borderWidth: 1,
    paddingTop: 0,
    textAlign: 'left'
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 50,
    marginVertical: 1
  },
  navContent: {
    marginTop: Platform.OS === "ios" ? 0 : 20,
    height: 57,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  buttonView: {
    flexDirection:"row", 
    justifyContent:"center", 
    marginTop: 15, 
    marginBottom: 25
  },
})