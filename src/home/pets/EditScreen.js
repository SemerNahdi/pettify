import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React from 'react'
import { Card, Icon } from 'react-native-elements'
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text, Button, Theme, RefreshIndicator } from "../../components";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default class EditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      avatar: Theme.links.defaultImage,
      avatarBackground: Theme.links.defaultImage,
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
      feedingTimes: [],
      feedingTime: null,
      quantity: null,
    };

    navigation = this.props.navigation;
    uid = navigation.state.params.uid;
    pet_uid = navigation.state.params.pet_uid;

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
          feedingTimes: doc.data().feedingTimes || [],
        });

        if (doc.data().pic == "null") {
          switch (this.state.species) {
            case "Cat":
              this.setState({
                avatar: Theme.links.defaultCat,
                avatarBackground: Theme.links.defaultCat
              })
              break;
            case "Dog":
              this.setState({
                avatar: Theme.links.defaultDog,
                avatarBackground: Theme.links.defaultDog
              })
              break;
            case "Bird":
              this.setState({
                avatar: Theme.links.defaultBird,
                avatarBackground: Theme.links.defaultBird
              })
              break;
            default:
              this.setState({
                avatar: Theme.links.defaultPet,
                avatarBackground: Theme.links.defaultPet
              })
              break;
          }
        }
        this.setState({ loading: false, })
      })
  }

  @autobind
  updateFireStorePetDetails() {
    const { name, age, yearsOwned, sex, classification, spayNeuter_Status, weight, activity,
      pregnancy, lactating, size, species, breed, feedingTimes } = this.state;

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid)
      .update({
        name, age, yearsOwned, sex, classification, spayNeuter_Status, weight, activity,
        pregnancy, lactating, size, species, breed, feedingTimes
      }).then(() => {
        navigation.state.params.setLoading(true);
        navigation.state.params.onEdit();
        navigation.state.params.onGoBack();
        navigation.goBack();
      });

  }

  chooseFile = async () => {
    this.setState({ loading: true });
    let result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled) {
      this.setState({ loading: false });
    } else if (result.error) {
      console.log('ImagePicker Error: ', result.error);
    } else if (result.customButton) {
      console.log('User tapped custom button: ', result.customButton);
    } else {
      let path = result.uri;
      let imageName = path.split("/").pop();
      const response = await fetch(path);
      const blob = await response.blob();

      await Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid).get()
        .then((pet) => {
          var pic = pet.data().pic;
          if (pic != "null") {
            var imageName = pic.substring(pic.indexOf("petPictures%2F") + 14, pic.indexOf("?alt=media"))
            Firebase.storage.ref().child("petPictures/" + imageName).delete();
          }
        })

      await Firebase.storage.ref().child("petPictures/" + imageName).put(blob)
        .then(() => {
          Firebase.storage.ref().child("petPictures/" + imageName).getDownloadURL()
            .then((pic) => {
              Firebase.firestore
                .collection("users")
                .doc(uid)
                .collection("pets")
                .doc(pet_uid)
                .update({ pic })
                .then(() => {
                  this.retrieveFireStorePetDetails()
                  navigation.state.params.setLoading(true);
                  navigation.state.params.onEdit();
                  navigation.state.params.onGoBack();
                  this.setState({ loading: false })
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
        { text: "Delete", onPress: () => this.deletingPet(), style: "destructive" }
      ]);
  }

  @autobind
  async deletingPet() {
    var ref = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid);

    await ref.get().then(async (pet) => {
      //check for petPictures
      var pic = pet.data().pic;
      if (pic != "null") {
        var imageName = pic.substring(pic.indexOf("petPictures%2F") + 14, pic.indexOf("?alt=media"))
        Firebase.storage.ref().child("petPictures/" + imageName).delete();
      }

      //check for lab results
      if (pet.data().labResults) {
        pet.data().labResults.forEach((pdf) => {
          var pdfName = pdf.substring(pdf.indexOf("labResults%2F") + 13, pdf.indexOf("?alt=media"));
          Firebase.storage.ref().child("labResults/" + pdfName).delete().catch((error) => { console.log(error) });
        })
      }

      //check for prescriptions
      await ref.collection("prescriptions").get()
        .then((docs) => {
          docs.forEach((data) => {
            ref.collection("prescriptions").doc(data.id).delete();
          })
        })

      //check for diet
      await ref.collection("diet").get()
        .then((docs) => {
          docs.forEach((data) => {
            ref.collection("diet").doc(data.id).delete();
          })
        })

      //check for dietU
      await ref.collection("dietU").get()
        .then((docs) => {
          docs.forEach((data) => {
            ref.collection("dietU").doc(data.id).delete();
          })
        })

    });

    ref.delete()
      .then(() => {
        navigation.state.params.onGoBack();
        navigation.navigate("Pets");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  setAllClose = () => {
    this.setState({ ageOpen: false })
    this.setState({ sizeOpen: false })
    this.setState({ activityOpen: false })
    this.setState({ pregnancyOpen: false })
    this.setState({ lactatingOpen: false })
  }

  handleAddFeedingTime = () => {
    const { quantity, feedingTime } = this.state;

    // Basic validation to check if both fields are filled
    if (quantity && feedingTime) {
      // Check if the feeding time format is correct (HH:mm)
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!timeRegex.test(feedingTime)) {
        alert("Please enter the time in HH:mm format.");
        return;
      }

      // Add the feeding time to the state as an object with quantity and feedingTime
      this.setState(prevState => ({
        feedingTimes: [
          ...prevState.feedingTimes,
          { quantity, feedingTime } // Store both quantity and feedingTime
        ],
        feedingTime: '',  // Clear the feeding time input field
        quantity: '',     // Clear the quantity input field
      }));
    } else {
      alert('Please enter both Quantity and Feeding Time');
    }
  };

  handleRemoveFeedingTime = (index) => {
    this.setState(prevState => {
      const feedingTimes = [...prevState.feedingTimes]; // Make a copy of the feedingTimes array
      feedingTimes.splice(index, 1); // Remove the item at the specified index
      return { feedingTimes };
    });
  };



  updateSpecies(species) {
    this.setState({ species: species })
  }

  updateSex(sex) {
    this.setState({ sex: sex })
    if (sex === "Male") {
      this.setState({ pregnancy: "Not Pregnant" })
      this.setState({ lactating: "Non Lactating" })
    }
  }

  setAgeValue = (callback) => {
    this.setState(item => ({
      age: callback(item.label)
    }))
  }

  setSizeValue = (callback) => {
    this.setState(item => ({
      size: callback(item.label)
    }))
  }

  setActivityValue = (callback) => {
    this.setState(item => ({
      activity: callback(item.label)
    }))
  }

  updateClassification(classification) {
    this.setState({ classification: classification })
  }

  updateSpayNeuter_Status(spayNeuter_Status) {
    this.setState({ spayNeuter_Status: spayNeuter_Status })
    if (spayNeuter_Status === "Spayed/Neutered") {
      this.setState({ pregnancy: "Not Pregnant" })
      this.setState({ lactating: "Non Lactating" })
    }
  }
  handleFeedingTimeChange = (quantity, text) => {
    this.setState((prevState) => ({
      feedingTimes: {
        ...prevState.feedingTimes,
        [quantity]: text, // Update only the time for this quantity
      },
    }));
  };
  handleQuantityChange = (oldQuantity, newQuantity) => {
    this.setState((prevState) => {
      const feedingTimes = { ...prevState.feedingTimes };
      if (feedingTimes[oldQuantity]) {
        const newFeedingTimes = { ...feedingTimes };
        newFeedingTimes[newQuantity] = feedingTimes[oldQuantity]; // Transfer the time to the new quantity
        delete newFeedingTimes[oldQuantity]; // Remove the old quantity key
        return { feedingTimes: newFeedingTimes };
      }
      return prevState;
    });
  };



  setPregnancyValue = (callback) => {
    this.setState(item => ({
      pregnancy: callback(item.label)
    }))
  }

  setLactatingValue = (callback) => {
    this.setState(item => ({
      lactating: callback(item.label)
    }))
  }

  handleName = (text) => {
    this.setState({ name: text })
  }

  handleBreed = (text) => {
    this.setState({ breed: text });
  }

  handleYearsOwned = (text) => {
    this.setState({ yearsOwned: text })
  }

  handleWeight = (text) => {
    this.setState({ weight: text })
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
          source={{ uri: avatarBackground }}
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
                  <Icon type="font-awesome-5" name="trash-alt" size={30} color={Theme.palette.danger} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerColumn}>
            <TouchableOpacity onPress={this.chooseFile}>
              <Image
                style={styles.userImage}
                source={{ uri: avatar }}
              />
              <Text style={styles.editText}>Edit Image</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }

  render(): React.Node {
    if (this.state.loading) {
      return (
        <ScrollView>
          <View style={{
            paddingTop: height / 2,
            justifyContent: "center",
          }}>
            <RefreshIndicator refreshing />
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
              <View style={styles.textContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={this.handleName}
                  returnKeyType='done'
                  defaultValue={this.state.name}
                />
              </View>

              <Text>Breed:</Text>
              <View style={styles.textContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={this.handleBreed}
                  returnKeyType='done'
                  defaultValue={this.state.breed}
                />
              </View>

              <Text>Weight (kg):</Text>
              <View style={styles.textContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={this.handleWeight}
                  keyboardType="numeric"
                  returnKeyType='done'
                  defaultValue={this.state.weight}
                />
              </View>

              <Text>Years Owned:</Text>
              <View style={styles.textContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={this.handleYearsOwned}
                  keyboardType="numeric"
                  returnKeyType='done'
                  defaultValue={this.state.yearsOwned}
                />
              </View>

              <Text>Species:</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => this.updateSpecies("Dog")}>
                  <FontAwesome5 name="dog" size={30} color={this.state.species == "Dog" ? Theme.palette.dogBlue : Theme.palette.washedBlue} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateSpecies("Cat")}>
                  <FontAwesome5 name="cat" size={30} color={this.state.species == "Cat" ? Theme.palette.catOrange : Theme.palette.washedBlue} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateSpecies("Bird")}>
                  <FontAwesome5 name="dove" size={30} color={this.state.species == "Bird" ? Theme.palette.birdRed : Theme.palette.washedBlue} />
                </TouchableOpacity>
              </View>

              <Text>Sex:</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => this.updateSex("Male")}>
                  <FontAwesome5 name="mars" size={30} color={this.state.sex == "Male" ? Theme.palette.maleBlue : Theme.palette.washedBlue} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateSex("Female")}>
                  <FontAwesome5 name="venus" size={30} color={this.state.sex == "Female" ? Theme.palette.femalePink : Theme.palette.washedBlue} />
                </TouchableOpacity>
              </View>

              <Text>Age Group:</Text>
              <DropDownPicker
                placeholder="Select age group"
                value={this.state.age}
                items={[{ label: '0 - 1 Months', value: '0 - 1 Months' }, { label: '1 - 4 Months', value: '1 - 4 Months' }, { label: '4 - 8 Months', value: '4 - 8 Months' }, { label: 'Adult', value: 'Adult' }]}
                open={this.state.ageOpen}
                setOpen={(open) => { this.setAllClose(); this.setState({ ageOpen: open }) }}
                setValue={this.setAgeValue}
                listMode="SCROLLVIEW"
                zIndex={5}
                style={styles.dropdown}
              />

              <Text>Size:</Text>
              <DropDownPicker
                placeholder="Select size"
                value={this.state.size}
                items={[{ label: 'Small', value: 'Small' }, { label: 'Medium', value: 'Medium' }, { label: 'Large', value: 'Large' }, { label: 'X-Large', value: 'X-Large' }]}
                open={this.state.sizeOpen}
                setOpen={(open) => { this.setAllClose(); this.setState({ sizeOpen: open }) }}
                setValue={this.setSizeValue}
                listMode="SCROLLVIEW"
                zIndex={4}
                style={styles.dropdown}
              />

              <Text>Activity Level:</Text>
              <DropDownPicker
                placeholder="Select activity level"
                value={this.state.activity}
                items={[{ label: 'Inactive', value: 'Inactive' }, { label: 'Mild', value: 'Mild' }, { label: 'Moderate', value: 'Moderate' }, { label: 'High', value: 'High' }]}
                open={this.state.activityOpen}
                setOpen={(open) => { this.setAllClose(); this.setState({ activityOpen: open }) }}
                setValue={this.setActivityValue}
                listMode="SCROLLVIEW"
                zIndex={3}
                style={styles.dropdown}
              />

              <Text>Living Space:</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => this.updateClassification("Indoors")}>
                  <FontAwesome5 name="home" size={30} color={this.state.classification == "Indoors" ? Theme.palette.skyBlue : Theme.palette.washedBlue} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateClassification("Outdoors")}>
                  <FontAwesome5 name="tree" size={30} color={this.state.classification == "Outdoors" ? Theme.palette.leafGreen : Theme.palette.washedBlue} />
                </TouchableOpacity>
              </View>

              <Text>Spayed/Neutered Status:</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => this.updateSpayNeuter_Status("Spayed/Neutered")}>
                  <FontAwesome5 name="check" size={30} color={this.state.spayNeuter_Status == "Spayed/Neutered" ? Theme.palette.success : Theme.palette.washedBlue} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.updateSpayNeuter_Status("Intact")}>
                  <FontAwesome5 name="ban" size={30} color={this.state.spayNeuter_Status == "Intact" ? Theme.palette.danger : Theme.palette.washedBlue} />
                </TouchableOpacity>
              </View>

              <Text>Feeding Times:</Text>
              {this.state.feedingTimes.map((item, index) => (
                <View key={index} style={styles.feedingTimeContainer}>
                  <View style={styles.inputContainerfeed}>
                    {/* Label for Quantity */}
                    <Text style={styles.label}>Quantity:</Text>
                    <TextInput
                      style={styles.inputFieldfeed}
                      value={item.quantity}
                      onChangeText={(text) => this.handleQuantityChange(index, text)} // Update feedingTimes based on index
                      placeholder="Enter quantity"
                      keyboardType="numeric"
                    />

                    {/* Label for Time */}
                    <Text style={styles.label}>Time:</Text>
                    <TextInput
                      style={styles.inputFieldfeed}
                      value={item.feedingTime}
                      onChangeText={(text) => this.handleFeedingTimeChange(index, text)} // Update feedingTimes based on index
                      placeholder="Enter time"
                    />
                  </View>

                  {/* Trash Button */}
                  <TouchableOpacity onPress={() => this.handleRemoveFeedingTime(index)}>
                    <FontAwesome5 name="trash" size={20} color={Theme.palette.danger} />
                  </TouchableOpacity>
                </View>
              ))}

              <Text>Scheduling Feeding Time:</Text>
              {/* Quantity Input */}
              <View style={styles.textContainer}>
                <TextInput
                  placeholder="Enter Quantity"
                  placeholderTextColor={Theme.palette.black}
                  style={styles.input}
                  onChangeText={quantity => this.setState({ quantity })}  // Set the quantity in state
                  value={this.state.quantity}  // Bind the value of quantity from state
                  keyboardType="numeric" // Allow only numeric input
                  returnKeyType="done"
                />
              </View>

              {/* Feeding Time Input */}
              <View style={styles.textContainer}>
                <TextInput
                  placeholder="Enter Feeding Time"
                  placeholderTextColor={Theme.palette.black}
                  style={styles.input}
                  onChangeText={feedingTime => this.setState({ feedingTime })}  // Set the feeding time in state
                  value={this.state.feedingTime}  // Bind the value of feedingTime from state
                  returnKeyType="done"
                />
              </View>

              {/* Add Feeding Time Button */}
              <TouchableOpacity
                onPress={() => {
                  this.handleAddFeedingTime(); // Call the method without quantity and feeding time arguments
                }}
                style={styles.addButton}
              >
                <Text>Add Feeding Time</Text>
              </TouchableOpacity>


              {this.state.sex === "Female" && this.state.spayNeuter_Status === "Intact" &&
                <>
                  <Text>Duration of Pregnancy:</Text>
                  <DropDownPicker
                    placeholder="Select duration of pregnancy"
                    value={this.state.pregnancy}
                    items={[{ label: 'Not Pregnant', value: 'Not Pregnant' }, { label: '0 - 5 Weeks', value: '0 - 5 Weeks' }, { label: '5 - 10 Weeks', value: '5 - 10 Weeks' }, { label: '10+ Weeks', value: '10+ Weeks' }]}
                    open={this.state.pregnancyOpen}
                    setOpen={(open) => { this.setAllClose(); this.setState({ pregnancyOpen: open }) }}
                    setValue={this.setPregnancyValue}
                    listMode="SCROLLVIEW"
                    zIndex={2}
                    style={styles.dropdown}
                  />

                  <Text>Duration of Lactation:</Text>
                  <DropDownPicker
                    placeholder="Select duration of lactation"
                    value={this.state.lactating}
                    items={[{ label: 'Non Lactating', value: 'Non Lactating' }, { label: '0 - 1 Weeks', value: '0 - 1 Weeks' }, { label: '1 - 3 Weeks', value: '1 - 3 Weeks' }, { label: '3+ Weeks', value: '3+ Weeks' }]}
                    open={this.state.lactatingOpen}
                    setOpen={(open) => { this.setAllClose(); this.setState({ lactatingOpen: open }) }}
                    setValue={this.setLactatingValue}
                    listMode="SCROLLVIEW"
                    zIndex={1}
                    style={styles.dropdown}
                  />
                </>
              }

              <View style={styles.buttonView}>
                <Button label="Submit Changes" onPress={this.updateFireStorePetDetails} style="secondary" />
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
    backgroundColor: Theme.palette.transparent,
    alignItems: "center"
  },
  input: {
    height: 30,
    margin: 2,
    textAlign: 'left'
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 3,
  },
  navContent: {
    height: 57,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userImage: {
    borderColor: Theme.palette.white,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 25
  },
  editText: {
    alignSelf: "center",
    color: Theme.palette.black,
    fontSize: 20,
  },
  textContainer: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Theme.palette.black,
    borderRadius: 8,
    marginVertical: 3
  },
  feedingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainerfeed: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Makes sure the input fields take equal space
    marginRight: 10,
  },
  inputFieldfeed: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    flex: 1, // Makes the input fields take equal space
  },
  addButton: {
    backgroundColor: Theme.palette.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
})