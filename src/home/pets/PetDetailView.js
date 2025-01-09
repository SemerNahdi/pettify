import autobind from "autobind-decorator";
import Firebase from "../../components/Firebase";
import React, { Component } from 'react'
import {TextInput} from 'react-native'
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
import { Button, RefreshIndicator, Text, Theme } from "../../components";

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'

var height = Dimensions.get('window').height; //full height

export default class PetDetailView extends Component {
  constructor(props) {
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
      feedingLogs: [],
      petBiology: { "species": "Miami", "breed": "Florida" },
    };

    navigation = this.props.navigation;
    uid = navigation.state.params.uid;
    pet_uid = navigation.state.params.pet_uid;
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
          feedingTimes: doc.data().feedingTimes || [],
          feedingLogs: doc.data().feedingLogs,
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
                avatarBackground: Theme.links.defaultImage
              })
              break;
          }
        }
        this.setState({ loading: false })

      })
  }

  @autobind
  retrieveWaterLevel() {
    Firebase.database
      .ref('waterLevel') // Correct the key to match your database structure
      .once('value')
      .then(snapshot => {
        const waterLevel = snapshot.val();
        if (waterLevel != null) {
          this.setState({ waterLevel: waterLevel }); // Store in state
          alert(`Current water level: ${waterLevel}`); // Display water level
        } else {
          alert('Error: No water level data available'); // Data not found
        }
      })
      .catch(error => {
        console.error("Error retrieving water level:", error);
        this.setState({ waterLevel: null });
        alert('Error: Failed to retrieve water level'); // Failed to retrieve
      });
  }

@autobind
sendFoodRequest() {
  // Check if there's an input value, if not generate a random one
  const requestedFoodQuantity = this.state.requestedFood && this.state.requestedFood.trim() !== ""
    ? parseInt(this.state.requestedFood)  // Parse the input value if it exists
    : Math.floor(Math.random() * (120 - 50 + 1)) + 50;  // Generate a random number between 50 and 120

  // Ensure that the requested food quantity is valid (a number and greater than zero)
  if (isNaN(requestedFoodQuantity) || requestedFoodQuantity <= 0) {
    alert("Please enter a valid quantity or use the random food quantity.");
    return;
  }

  // Send the food request to Firebase
  Firebase.database
    .ref('feedingRequests/requestedFood') // Use your appropriate path
    .set(requestedFoodQuantity) // Set the requested quantity
    .then(() => {
      if (!this.state.requestedFood || this.state.requestedFood.trim() === "") {
        // Playful message when no input is given
        alert(`Oops! Looks like you didn't enter anything, so we've sent a surprise treat of ${requestedFoodQuantity}g! 🎉 Enjoy the fun!`);
      } else {
        alert(`Got it! ${requestedFoodQuantity}g of food has been requested. 🐶🍽 Time to chow down!`);
      }
      console.log('Food request sent:', requestedFoodQuantity);

      // Clear the input field by resetting the state
      this.setState({ requestedFood: "" });

      // Now listen for the action message to be updated in Firebase
      this.listenForActionMessage();
    })
    .catch((error) => {
      console.error('Error sending food request:', error);
      alert('Error: Could not send food request');
    });
}

  @autobind
  listenForActionMessage() {
    Firebase.database
      .ref('feedingStatus/actionMessage')  // Path where the action message is stored
      .on('value', snapshot => {
        const actionMessage = snapshot.val();

        if (actionMessage && actionMessage !== "") {
          // Show the message in an alert
          alert(actionMessage);
          console.log("Received action message: ", actionMessage);

          // Clear the action message in Firebase after displaying it
          Firebase.database.ref('feedingStatus/actionMessage').set(""); // Set to an empty string

          console.log('Action message cleared in Firebase.');
        }
      });
  }


  componentDidMount() {
    this.listenForActionMessage();  // Start listening for action message on mount
  }


  handleLoading = (bool) => {
    this.setState({ loading: bool })
  }
  renderFeedingTimes() {
    const { feedingTimes } = this.state;

    // If no feeding times are available
    if (!feedingTimes || feedingTimes.length === 0) {
      return <Text>No feeding times available</Text>;
    }
    return feedingTimes.map((feedingTime, index) => (
      <View key={index} style={styles.feedingTimeContainer}>
        <View style={styles.feedingTimeCard}>

          <View style={styles.feedingTimeDetails}>
            <Text style={styles.feedingTimeLabel}>Feeding Time {index + 1}</Text>
            <Text style={styles.feedingTimeText}>
              <Text style={styles.feedingTimeSubText}>Time:</Text> {feedingTime.feedingTime}
            </Text>
            <Text style={styles.feedingTimeText}>
              <Text style={styles.feedingTimeSubText}>Quantity:</Text> {feedingTime.quantity}
            </Text>
          </View>
        </View>
      </View>
    ));
  }
  renderFeedingLogs() {
    const { feedingLogs } = this.state;

    // If no feeding logs are available
    if (!feedingLogs || feedingLogs.length === 0) {
      return <Text>No feeding logs available</Text>;
    }

    // Map over the feeding logs and render them
    return feedingLogs.map((log, index) => (
      <View key={index} style={styles.feedingLogContainer}>
        <View style={styles.feedingLogCard}>
          <Text style={styles.feedingLogDate}>Date: {log.date}</Text>
          <Text style={styles.feedingLogDetails}>
            <Text style={styles.feedingLogLabel}>Time:</Text> {log.feedingTime}
          </Text>
          <Text style={styles.feedingLogDetails}>
            <Text style={styles.feedingLogLabel}>Quantity:</Text> {log.quantity}
          </Text>
          <Text style={styles.feedingLogDetails}>
            <Text style={styles.feedingLogLabel}>Ate:</Text> {log.ate ? 'Yes' : 'No'}
          </Text>
        </View>
      </View>
    ));
  }

  @autobind
  goBackToPets() {
    this.props.navigation.goBack();
  }

  @autobind
  goToEditScreen() {
    navigation.navigate("EditScreen", { pet_uid, uid, onGoBack, onEdit: () => this.retrieveFireStorePetDetails(), setLoading: (bool) => this.handleLoading(bool) });
  }

  @autobind
  goToTrainingScreen() {
    const { breed, species } = this.state;
    navigation.navigate("TrainingScreen", { breed, species });
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
          source={{ uri: avatarBackground }}
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
              source={{ uri: avatar }}
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
    return (
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

  render(): React.Node {
    if (this.state.loading) {
      return (
        <ScrollView>
          <View style={{ paddingTop: height / 2, justifyContent: "center" }}>
            <RefreshIndicator refreshing />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView persistentScrollbar={false}>
          {this.renderHeader()}

          <View style={styles.infoContainer}>

            <View style={{ paddingBottom: 10 }}>
              <Text type="header3" style={styles.petText}> Pet Information </Text>
              <Text> Age Group: {this.state.age}</Text>
              <Text> Size: {this.state.size}</Text>
              <Text> Weight (kg): {this.state.weight}</Text>
              <Text> Level of Activity: {this.state.activity}</Text>
              <Text> Years Owned: {this.state.yearsOwned}</Text>
              <Text> Living Space: {this.state.classification}</Text>
              <Text> Spayed/Neutered Status: {this.state.spayNeuter_Status}</Text>

              {this.state.sex === "Female" && this.state.spayNeuter_Status === "Intact" &&
                <>
                  <Text> Duration of Pregnancy: {this.state.pregnancy}</Text>
                  <Text> Duration of Lactation: {this.state.lactating}</Text>
                </>
              }
            </View>

            <Text type="header3" style={styles.petText}>Feeding Times</Text>
            {this.renderFeedingTimes()}

            {Separator()}

            <Text type="header3" style={styles.petText}>Feeding Logs</Text>
            {this.renderFeedingLogs()}
            {Separator()}

            <Text type="header3" style={styles.petText}> Veterinary Contact Information </Text>
            {this.renderTel()}

            {Separator()}

            {this.renderEmail()}

            {/* Button for water level and food request */}
            <View style={styles.buttonContent}>
              <View style={styles.buttonContainer}>
                <Button
                  label="                   Get Water Level                    "
                  style="primary"
                  onPress={this.retrieveWaterLevel} // Trigger the water retrieval function
                />
              </View>

              {/* Food button and input field */}
              <View style={styles.inputContainer}>
                <TextInput
                  placeholderTextColor={Theme.palette.black}
                  style={styles.input}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={this.state.requestedFood} // Bind the input value to state
                    onChangeText={(value) => this.setState({ requestedFood: value })} // Update state on text change
                />
                <View style={styles.buttonContainer2}>
                  <Button
                    label="Dispense a Treat"
                    style="secondary"
                    onPress={this.sendFoodRequest} // Send food request on press
                  />
                </View>
              </View>
            </View>

            {Separator()}

            <View style={styles.buttonContent}>
              <View style={styles.buttonContainer}>
                <Button label={"View Training Videos on " + this.state.breed + "'s"}
                  style="secondary" onPress={this.goToTrainingScreen} />
              </View>

              <View style={styles.buttonContainer}>
                <Button label={"View Lab Documents for " + this.state.name}
                  style="secondary" onPress={this.goToLabResults} />
              </View>

              <View style={styles.buttonContainer}>
                <Button label={"View Prescriptions for " + this.state.name}
                  style="secondary" onPress={this.goToPrescription} />
              </View>

              <View style={styles.buttonContainer}>
                <Button label={"View Recommended Diet for " + this.state.name}
                  style="secondary" onPress={this.goToDiet} />
              </View>
            </View>

          </View>

        </ScrollView>
      );
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
    flexDirection: "row",
    justifyContent: "center",
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
  feedingTimeContainer: {
    marginBottom: 15, // Adds spacing between each feeding time entry
  },
  feedingTimeCard: {
    flexDirection: 'row', // Aligning icon and details horizontally
    backgroundColor: '#fff', // White background
    borderWidth: 1, // Black border
    borderColor: '#000', // Black border color
    borderRadius: 10, // Rounded corners
    padding: 10, // Padding inside the card
    shadowColor: '#000', // Shadow for depth
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Elevation for Android
    alignItems: 'center', // Center items vertically
  },
  feedingTimeIcon: {
    marginRight: 15, // Space between icon and text
    color: '#000', // Black icon color
  },
  feedingTimeDetails: {
    flex: 1, // Take up the remaining space
  },
  feedingTimeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Black text
    marginBottom: 5,
  },
  feedingTimeText: {
    fontSize: 14,
    color: '#000', // Black text
  },
  feedingTimeSubText: {
    fontWeight: 'bold', // Make "Time" and "Quantity" bold
    color: '#000', // Black text
  }, feedingLogContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  feedingLogCard: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  feedingLogDate: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  feedingLogDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
  feedingLogLabel: {
    fontWeight: 'bold',
  },
   inputContainer: {
      flexDirection: 'row', // Align input and button horizontally
      alignItems: 'center', // Center them vertically
      justifyContent: 'space-between', // Space them evenly
      marginVertical: 10, // Adjust vertical spacing around the container
    },
    input: {
      flex: 1, // Take up available space
      borderWidth: 1,
      borderColor: '#ccc', // Grey border for input field
      paddingVertical: 10, // Padding inside the input field
      paddingHorizontal: 15, // Padding inside the input field
      marginRight: 10, // Space between input and button
      borderRadius: 5, // Optional: rounded corners for input field
      height: 40, // Same height for input field to align with button
    },
    buttonContainer2: {
      justifyContent: 'center', // Align button vertically in the container
      height: 40, // Ensure the button has the same height as the input field
    },
   buttonContent: {
     marginVertical: 10,
   },

})