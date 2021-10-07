import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SectionList, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../../components";
import MultiSelect from "react-native-multiple-select";
import Firebase from "../../../components/Firebase";

export default class PetPrescription extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Rimadyl" },
        { name: "Metacam" },
        { name: "Deramaxx" }
      ],
      role: "",
      selectedItem: "",
      existentPrescriptions: [],
      diagnoseButtonIsVisible: true,      
      instructions: "",
      qty: "",
      dose: "", 
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

      this.retrieveFireStorePrescriptions();
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItem: selectedItems[0] });
    // console.log("************** this.state", this.state);
    // console.log("************** selectedItems", selectedItems);
  }

  setDose = (dose) => {
    //this.state.dose = dose;
    this.setState({dose: dose});
  }

  setQuantity = (qty) => {
    this.setState({qty: qty});
  }

  setInstruction = (instructions) => {
    this.setState({instructions: instructions});
  }

  savePrescriptionToFireStore = () => {

    var checkForInputs = [
      this.state.selectedItem,
      this.state.dose,
      this.state.qty,
      this.state.instructions,
    ];

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
        .collection("prescriptions")
        .add({
          prescription: this.state.selectedItem,
          dose: this.state.dose,
          date: new Date(),
          quantity: this.state.qty,
          instructions: this.state.instructions
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }})
    .then((res) => {
      this.state.selectedItem = "";
      this.state.dose = "";
      this.state.qty = "";
      this.state.instructions = "";
      this.setState({ loading: false});
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  retrieveFireStorePrescriptions() {
    this.state.existentPrescriptions = [];

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .collection("pets")
      .doc(pet_uid)
      .collection("prescriptions")
      .get()
      .then((snapshot) => {
        //console.log("********************** snapshot => ",snapshot._delegate._snapshot.docChanges);
        snapshot.forEach((doc) => {
          //console.log('*********** item => ', doc.data());
          this.state.existentPrescriptions.push({
            prescription: doc.data().prescription,
            dose: doc.data().dose,
            qty: doc.data().quantity,
            instructions: doc.data().instructions,
            date: new Date(doc.data().date.seconds*1000).toString()
          });
          //console.log("************** existentPrescriptions", this.state.existentPrescriptions);
        });
      })
      .then((res) => {
        this.setState({ loading: false})
        //console.log("************** 150 existentPrescriptions", this.state.existentPrescriptions);
      });      
      
    //console.log("************** this.existentPrescriptions", this.state.existentPrescriptions);
  }


  render() {
    const { items, selectedItem } = this.state;
    return (
      <ScrollView style={styles.container}>
        <NavHeaderWithButton title="Prescriptions" back {...{ navigation }} />

        {this.state.role == 'v' && <View style = {styles.prescriptionInputContainer}>

          <MultiSelect
            single
            items={items} // List of items to display in the multi-select component
            uniqueKey="name" // Unique identifier that is part of each item"s properties
            onSelectedItemsChange={this.onSelectedItemsChange} // Triggered when Submit button is clicked
            onChangeInput={(text) => console.warn(text)} // Called every time TextInput is changed with the value
            displayKey="name" // Used to select the key to display the objects in the items array
            flatListProps={{ nestedScrollEnabled: true }} // Necessary for nested scrolling in Android devices

            selectText="Select Prescription"
            fontFamily="SFProText-Semibold"
            altFontFamily="SFProText-Semibold"
            styleListContainer={{ backgroundColor: Theme.palette.white, paddingVertical: 10 }}
            styleItemsContainer={{ justifyContent: "space-evenly", flexDirection: "column" }}
            styleMainWrapper={{ height: height / 4.5, shadowColor: Theme.palette.lightGray, shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 6 }}

            itemTextColor={Theme.palette.black}
            textColor={Theme.palette.black}
            selectedItems={[selectedItem]}
            selectedItemFontFamily="SFProText-Semibold"
            selectedItemTextColor={Theme.palette.success}
            selectedItemIconColor={Theme.palette.success}

            searchInputPlaceholderText="Search prescriptions..."
            searchInputStyle={{ color: Theme.palette.black, fontFamily: "SFProText-Semibold" }}
            styleInputGroup={{ backgroundColor: "#9dffb0", height: height / 15, borderRadius: 10, paddingRight: 15 }}
            styleDropdownMenuSubsection={{ height: height / 15, borderRadius: 10, width: "100%", paddingLeft: 25 }}

            tagTextColor={Theme.palette.black}
            tagRemoveIconColor={Theme.palette.black}
            tagBorderColor={Theme.palette.primary}
            tagContainerStyle={{ backgroundColor: Theme.palette.white, alignSelf: "flex-start" }}

            submitButtonColor={Theme.palette.primary}
            submitButtonText="Add prescription"
            // hideSubmitButton
            // hideTags
            hideDropdown
            ref={(component) => { this._multiSelect = component }}
          />
          
          <TextInput
            style={styles.input}
            returnKeyType = 'next'
            key="dose"
            placeholder="Dose"
            onChangeText={text => this.setDose(text)}
            multiline={false}
            value={this.state.dose}
          />

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            returnKeyType = 'next'
            key="quantity"
            placeholder="Quantity"
            onChangeText={text => this.setQuantity(text)}
            multiline={false}
            value={this.state.qty}
          />

          <TextInput
            style={styles.bigInput}
            returnKeyType = 'done'
            key="instructions"
            placeholder="Instructions"
            autoCapitalize = 'sentences'
            autoCorrect = {true}
            onChangeText={text => this.setInstruction(text)}
            multiline={true}
            value={this.state.instructions}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={this.savePrescriptionToFireStore}>
            <Text>
              Submit Prescription
            </Text>
          </TouchableOpacity>
          
        </View>}

        <View style={styles.prescriptionHistoryContainer}>
          <View style={{paddingTop:10},{paddingBottom:10}}>
            <Text type="header3"> Prescriptions History </Text>
          </View>
            <View style={{paddingBottom: 10}}>
              {
                //console.log("**** element ===> ", this.state.existentPrescriptions);
                this.state.existentPrescriptions.map((element, k) => {
                  //console.log("**** element ===> ", element, k);
                  return <View style={styles.item} key={k}>
                    <Text> Prescription: {element.prescription}</Text>
                    <Text> Dose: {element.dose}</Text>
                    <Text> Quantity: {element.qty}</Text>
                    <Text> Instructions: {element.instructions}</Text>
                    <Text> Date: {element.date}</Text>
                  </View>
                })
              }
            </View>
        </View>
      </ScrollView>
    )
  }
}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  submitButton:{
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#9dffb0',
    alignSelf: 'center',
    padding: 10,
  },
  prescriptionHistoryContainer:{
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  prescriptionInputContainer:{
    backgroundColor: '#fff',
    paddingBottom: 35,
  },
  input: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FAFAFA',
    margin: 12,
  },
  bigInput: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FAFAFA',
    margin: 12,
    height: 100
  },
  item: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#9dffb0',
    borderColor: '#808080',
    fontSize: 15,
    padding: 5,
  },
  title: {
    fontSize: 24
  }
});