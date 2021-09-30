import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SectionList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../../components";
import { LinearGradient } from "expo-linear-gradient";
import MultiSelect from "react-native-multiple-select";
import Firebase from "../../../components/Firebase";
 
export default class PetDiet extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      selectedItem: "",
      selectedDiet: [],
      existentDiet: [],
      existentDietU: [],
      dietToString: "",
      diagnoseButtonIsVisible: true,      
      dietDetails: "",
      date: ""
    };
 
    navigation = this.props.navigation;
    uid = navigation.state.params.uid;
    pet_uid = navigation.state.params.pet_uid;
 
    Firebase.firestore
    .collection("users")
    .doc(Firebase.auth.currentUser.uid)
    .get()
    .then(docs => {
      this.setState({
        role: docs.data().role,
      });
    });
 
    this.retrieveFireStoreDiet();
    this.retrieveFireStoreDietU();
  }
 
 
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItem: selectedItems[0] });
  }
 
  setDietDetails = (dietDetails) => {
    this.setState({dietDetails: dietDetails});
  }
 
  arrayToString = () => {
    this.state.dietToString = JSON.stringify(this.state.selectedDiet);
    this.state.dietToString = this.state.dietToString.replace(/["]+/g, '');
    this.state.selectedDiet = [];
  }
 
  saveDietToFireStore = () => {
 
    var checkForInputs = [
      this.state.selectedItem,
      this.state.dietDetails,
    ];
 
    this.arrayToString();
 
    //Checks to see if any inputs are not filled out
    for (let i = 0; i < checkForInputs.length; i++) {
      if (checkForInputs[i] == null) {
        alert("Fill all fields");
        return;
      }
    }
 
    var docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid);
 
    //Add pet to firestore
    docRef
    .get()
    .then((doc) => {
      this.setState({ loading: true});
      if (doc.exists) {
        docRef
        .collection("diet")
        .add({
          date: new Date(),
          diet: this.state.dietToString,
          dietDetails: this.state.dietDetails
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }})
    .then((res) => {
      this.state.selectedItem = "";
      this.state.dietDetails = "";
      this.state.dietToString = "";
      this.setState({ loading: false});
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  saveDietToFireStoreU = () => {
 
    var checkForInputs = [
      this.state.selectedItem,
      this.state.dietDetails,
    ];
 
    this.arrayToString();
 
    //Checks to see if any inputs are not filled out
    for (let i = 0; i < checkForInputs.length; i++) {
      if (checkForInputs[i] == null) {
        alert("Fill all fields");
        return;
      }
    }
 
    var docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid);
 
    //Add pet to firestore
    docRef
    .get()
    .then((doc) => {
      this.setState({ loading: true});
      if (doc.exists) {
        docRef
        .collection("dietU")
        .add({
          date: new Date(),
          diet: this.state.dietToString,
          dietDetails: this.state.dietDetails
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }})
    .then((res) => {
      this.state.selectedItem = "";
      this.state.dietDetails = "";
      this.state.dietToString = "";
      this.setState({ loading: false});
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  }
 
  retrieveFireStoreDiet() {
    
    this.state.existentDiet = [];
 
    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid)
      .collection("diet")
      .get()
      .then((snapshot) => {
        //console.log("********************** snapshot => ",snapshot._delegate._snapshot.docChanges);
        snapshot.forEach((doc) => {
          //console.log('*********** item => ', doc.data());
          this.state.existentDiet.push({
            diet: doc.data().diet,
            dietDetails: doc.data().dietDetails,
            date: new Date(doc.data().date.seconds*1000).toString()
          });
          //console.log("************** existentPrescriptions", this.state.existentPrescriptions);
        });
      })
      .then((res) => {
        this.setState({ loading: false})
        //console.log("************** 150 existentDiet", this.state.existentDiet);
      });      
 
    //console.log("************** this.existentPrescriptions", this.state.existentPrescriptions);
  }

  retrieveFireStoreDietU() {
    this.state.existentDietU = [];
 
    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid)
      .collection("dietU")
      .get()
      .then((snapshot) => {
        //console.log("********************** snapshot => ",snapshot._delegate._snapshot.docChanges);
        snapshot.forEach((doc) => {
          //console.log('*********** item => ', doc.data());
          this.state.existentDietU.push({
            diet: doc.data().diet,
            dietDetails: doc.data().dietDetails,
            date: new Date(doc.data().date.seconds*1000).toString()
          });
          //console.log("************** existentPrescriptions", this.state.existentPrescriptions);
        });
      })
      .then((res) => {
        this.setState({ loading: false})
        //console.log("************** 150 existentDiet", this.state.existentDietU);
      });      
 
    //console.log("************** this.existentPrescriptions", this.state.existentPrescriptions);
  }
 
 
  onPressMilk = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Milk"] });
  }
 
  onPressFish = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Fish"] });
  }
 
  onPressLamb = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Lamb"] });
  }
 
  onPressChicken = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Chicken"] });
  }
 
  onPressEggs = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Eggs"] });
  }
 
  onPressRice = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Rice"] });
  }
 
  onPressOatmeal = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Oatmeal"] });
  }
 
  onPressCorn = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Corn"] });
  }
 
  onPressBarley = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Barley"] });
  }
 
  onPressBeetPulp = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Beet Pulp"] });
  }
 
  onPressCellulose = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Cellulose"] });
  }
 
  onPressChicoryRoot = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Chicory Root"] });
  }
 
  onPressYeastExtract = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Yeast Extract"] });
  }
 
  onPressSoyOil = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Soy Oil"] });
  }
 
  onPressCanolaOil = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Canola Oil"] });
  }
 
  onPressFishOil = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Fish Oil"] });
  }
 
  onPressVegetables = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Vegetables"] });
  }
 
  onPressSupplements = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Supplements"] });
  }
 
  onPressCitrus = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Citrus"] });
  }
 
  onPressCereal = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Cereal"] });
  }
 
  onPressBrewersYeast = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Brewers Yeast"] });
  }
 
  onPressLiver = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Liver"] });
  }
 
  onPressMineralSalt = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Mineral Salt"] });
  }
 
  onPressBone = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Bone"] });
  }
 
  onPressWheat = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Wheat"] });
  }
 
  onPressPurifiedSupplement = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Purified Supplement"] });
  }
 
  onPressCarrots = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Carrots"] });
  }
 
  onPressMarigoldExtract = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Marigold Extract"] });
  }
 
  onPressCartilage = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Cartilage"] });
  }
 
  onPressCrustaceans = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Crustaceans"] });
  }
 
  onPressGreenTeaExtract = () => {
    this.setState({ selectedDiet: [...this.state.selectedDiet, "Green Tea Extract"] });
  }
 
 
  render() {
    const { items, selectedItem } = this.state;
 
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <NavHeaderWithButton title="Diet" back {...{ navigation }} />
        <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.gradient} />
 
        <View style= {styles.dietHeading}>
            <Text style={{fontSize: 20 }}> {"Proteins:"} </Text>
          </View> 
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressMilk}>
              <Text style={{fontSize: 15 }}> {"Milk"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressFish}>
              <Text style={{fontSize: 15 }}> {"Fish"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressEggs}>
              <Text style={{fontSize: 15 }}> {"Eggs"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressChicken}>
              <Text style={{fontSize: 15 }}> {"Chicken"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressLamb}>
              <Text style={{fontSize: 15 }}> {"Lamb"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= {styles.dietHeading}>
            <Text style={{fontSize: 20 }}> {"Carbohydrates:"} </Text>
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressRice}>
              <Text style={{fontSize: 15 }}> {"Rice"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressOatmeal}>
              <Text style={{fontSize: 15 }}> {"Oatmeal"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCorn}>
              <Text style={{fontSize: 15 }}> {"Corn"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressBarley}>
              <Text style={{fontSize: 15 }}> {"Barley"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressBeetPulp}>
              <Text style={{fontSize: 15 }}> {"Beet Pulp"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCellulose}>
              <Text style={{fontSize: 15 }}> {"Cellulose"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressChicoryRoot}>
              <Text style={{fontSize: 15 }}> {"Chicory Root"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressYeastExtract}>
              <Text style={{fontSize: 15 }}> {"Yeast Extract"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= {styles.dietHeading}>
            <Text style={{fontSize: 20 }}> {"Fats:"} </Text>
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressSoyOil}>
              <Text style={{fontSize: 15 }}> {"Soy Oil"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCanolaOil}>
              <Text style={{fontSize: 15 }}> {"Canola Oil"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressFishOil}>
              <Text style={{fontSize: 15 }}> {"Fish Oil"} </Text>
                </TouchableOpacity>
            </View>  
          </View>
 
          <View style= {styles.dietHeading}>
            <Text style={{fontSize: 20 }}> {"Vitamins:"} </Text>
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressVegetables}>
              <Text style={{fontSize: 15 }}> {"Vegetables"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressSupplements}>
              <Text style={{fontSize: 15 }}> {"Supplements"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCitrus}>
              <Text style={{fontSize: 15 }}> {"Citrus"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCereal}>
              <Text style={{fontSize: 15 }}> {"Cereal"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressBrewersYeast}>
              <Text style={{fontSize: 15 }}> {"Brewers Yeast"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressLiver}>
              <Text style={{fontSize: 15 }}> {"Liver"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressMineralSalt}>
              <Text style={{fontSize: 15 }}> {"Mineral Salt"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressBone}>
              <Text style={{fontSize: 15 }}> {"Bone"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressWheat}>
              <Text style={{fontSize: 15 }}> {"Wheat"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressPurifiedSupplement}>
              <Text style={{fontSize: 15 }}> {"Purified Supplement"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= {styles.dietHeading}>
            <Text style={{fontSize: 20 }}> {"Other:"} </Text>
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCorn}>
              <Text style={{fontSize: 15 }}> {"Corn"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCarrots}>
              <Text style={{fontSize: 15 }}> {"Carrots"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressMarigoldExtract}>
              <Text style={{fontSize: 15 }}> {"Marigold Extract"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCartilage}>
              <Text style={{fontSize: 15 }}> {"Cartilage"} </Text>
                </TouchableOpacity>
            </View> 
          </View>
 
          <View style= { {flexDirection: "row"} }>
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressCrustaceans}>
              <Text style={{fontSize: 15 }}> {"Crustaceans"} </Text>
                </TouchableOpacity>
            </View> 
 
            <View style= {styles.button_one}>
            <TouchableOpacity onPress={this.onPressGreenTeaExtract}>
              <Text style={{fontSize: 15 }}> {"Green Tea Extract"} </Text>
                </TouchableOpacity>
            </View>
          </View>
 
         <TextInput
          style={styles.bigInput}
          placeholder="Diet Details"
          onChangeText={text => this.setDietDetails(text)}
          multiline={true}
          value={this.state.dietDetails}
        />  
 
        {this.state.role == 'v' &&
          <TouchableOpacity
            style={styles.prescBottom}
            onPress={this.saveDietToFireStore}>
            <Text>
              Save Diet
            </Text>
          </TouchableOpacity>
        }

        {this.state.role == 'p' &&
          <TouchableOpacity
            style={styles.prescBottom}
            onPress={this.saveDietToFireStoreU}>
            <Text>
              Save Diet
            </Text>
          </TouchableOpacity>
        }

        <Text type="header3"> Suggested Diet </Text>
        <ScrollView  persistentScrollbar={false} >
          <View style={{paddingBottom: 10}}>
            {
              //console.log("**** element ===> ", this.state.existentPrescriptions);
              this.state.existentDiet.map((element, k) => {
                //console.log("**** element ===> ", element, k);
                return <View key={k}>
                  <Text> Diet: {element.diet}</Text>
                  <Text> Diet Details: {element.dietDetails}</Text>
                  <Text> Date: {element.date}</Text>
                  <Text> --</Text>
                </View>
              })
            }
          </View>
        </ScrollView>

         
        <Text type="header3"> User Diet </Text>
        <ScrollView  persistentScrollbar={false} >
          <View style={{paddingBottom: 10}}>
            {
              //console.log("**** element ===> ", this.state.existentPrescriptions);
              this.state.existentDietU.map((element, k) => {
                //console.log("**** element ===> ", element, k);
                return <View key={k}>
                  <Text> Diet: {element.diet}</Text>
                  <Text> Diet Details: {element.dietDetails}</Text>
                  <Text> Date: {element.date}</Text>
                  <Text> --</Text>
                </View>
              })
            }
          </View>
        </ScrollView>

        <View style= {styles.dietHeading}>
          <Text style={{fontSize: 1 }}> {""} </Text>
        </View>

        <View style= {styles.dietHeading}>
          <Text style={{fontSize: 1 }}> {""} </Text>
        </View>
  
      </ScrollView>
    )
  }
}
 
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll'
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  prescBottom: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    padding: 10,
    marginTop: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 99
  },
  input: {
    height: 30,
    margin: 6,
    borderWidth: 1,
    paddingTop: 0,
    textAlign: 'left'
  },
  bigInput: {
    height: 70,
    margin: 6,
    borderWidth: 1,
    paddingTop: 0,
    textAlign: 'left',
    backgroundColor: `#00fa9a`,
    borderColor: '#66cdaa',
    borderRadius: 10
  },
  header: {
    backgroundColor: "#e0f4ff",
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 23,
    padding: 10,
    flexDirection: "row"
  },
  item: {
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 15,
    padding: 10,
  },
  title: {
    fontSize: 24
  },
  endnote: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  button_one: {
    justifyContent: 'space-around',
    width: '40%',
    backgroundColor: `#00fa9a`,
    height: 40,
    bottom: '1%',
    top: '1%',
    right: 5,
    left: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#66cdaa',
    borderRadius: 10
  }, 
  button_two: {
    justifyContent: 'space-around',
    backgroundColor: `#9dffb0`,
    height: 40,
    bottom: '1%',
    top: '2%'
  },
  dietHeading: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 2
  }
});