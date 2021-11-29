import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet, ScrollView, Dimensions, SectionList, TextInput, SafeAreaView } from 'react-native';
import { Theme, NavHeader, Text, Container, Button } from "../../../components";
import Firebase from "../../../components/Firebase";
import DropDownPicker from 'react-native-dropdown-picker';

export default class PetPrescription extends Component<> {
  constructor(props) {
    super(props);
    this.state = {
      prescription: null,
      prescriptionOpen: false,
      role: "",
      existentPrescriptions: [],
      diagnoseButtonIsVisible: true,      
      instructions: null,
      qty: null,
      dose: null, 
      date: null
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

  setPrescriptionValue = (callback) => {
    this.setState( item => ({
      prescription: callback(item.label)
    }))
  }

  setDose = (dose) => {
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
      this.state.prescription,
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
    var date = new Date().toISOString();
    //Add pet to firestore
    docRef
    .get()
    .then((doc) => {
      this.setState({ loading: true});
      if (doc.exists) {
        docRef
        .collection("prescriptions")
        .doc(date)
        .set({
          prescription: this.state.prescription,
          dose: this.state.dose,
          date: new Date(),
          quantity: this.state.qty,
          instructions: this.state.instructions
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }})
    .then(() =>{
      this.retrieveFireStorePrescriptions()
    })
    .then(() => {
      this.state.prescription = null;
      this.state.dose = null;
      this.state.qty = null;
      this.state.instructions = null;
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
        snapshot.forEach((doc) => {
          this.state.existentPrescriptions.push({
            prescription: doc.data().prescription,
            dose: doc.data().dose,
            qty: doc.data().quantity,
            instructions: doc.data().instructions,
            date: new Date(doc.data().date.seconds*1000).toString()
          });
        });
      })
      .then((res) => {
        this.setState({ loading: false})
        this.setState({existentPrescriptions: [...this.state.existentPrescriptions.reverse()]})
      });      
  }

  render() {
    const { items, prescription } = this.state;
    return (
      <ImageBackground source={require('../../../../assets/pattern.png')} style={styles.container}>
      <ScrollView style={styles.container}>
        <NavHeader title="Prescriptions" back backFn={() => this.props.navigation.goBack()} {...{ navigation }}/>

        {this.state.role == 'v' && 
        <View style = {styles.prescriptionInputContainer}>

          <Container style={styles.inputContainer}>
            <DropDownPicker 
              placeholder="Select Prescription"
              value={this.state.prescription}
              items={[{label: 'Rimadyl', value: 'Rimadyl'}, {label: 'Metacam', value: 'Metacam'}, {label: 'Deramaxx', value: 'Deramaxx'}]}
              open={this.state.prescriptionOpen}
              setOpen={(open) => { this.setState({prescriptionOpen: open}) } }
              setValue={this.setPrescriptionValue}
              listMode="SCROLLVIEW"
              style={styles.input}
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

            <View style={styles.buttonView}>
              <Button label="Submit Prescription" onPress={this.savePrescriptionToFireStore} style="primary"/>
            </View>
          </Container>
        </View>}

        <View style={styles.prescriptionHistoryContainer}>
          <View style={{paddingTop:10},{paddingBottom:10}}>
            <Text type="header3"> Prescriptions History </Text>
          </View>
            {
              this.state.existentPrescriptions.length === 0 && (
                <View style={styles.centerText}>
                  <Text type="large"> No Prescriptions to show </Text>
                </View>
              )
            }
            {
              this.state.existentPrescriptions.map((element, k) => {
                return (
                  <View style={styles.item} key={k}>
                    <Text> Prescription: {element.prescription}</Text>
                    <Text> Dose: {element.dose}</Text>
                    <Text> Quantity: {element.qty}</Text>
                    <Text> Instructions: {element.instructions}</Text>
                    <Text> Date: {element.date}</Text>
                  </View>
                )
              })
            }
        </View>
      </ScrollView>
      </ImageBackground>
    )
  }
}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  inputContainer: {
    marginHorizontal: 15,
    marginTop: 15
  },
  submitButton:{
    borderColor: Theme.palette.primary,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Theme.palette.primary,
    alignSelf: 'center',
    padding: 10,
  },
  prescriptionHistoryContainer:{
    backgroundColor: Theme.palette.transparent,
  },
  prescriptionInputContainer:{
    backgroundColor: Theme.palette.transparent,
    paddingBottom: 20,
  },
  input: {
    borderColor: Theme.palette.black,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Theme.palette.white,
    marginBottom:13
  },
  bigInput: {
    borderColor: Theme.palette.black,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Theme.palette.white,
    height: 100,
    marginBottom: 20
  },
  item: {
    margin:15,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Theme.palette.white,
    borderColor: Theme.palette.black,
    fontSize: 15,
    padding: 10,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center"
  },
  centerText:{
    flexDirection:"row",
    justifyContent:"center",
    paddingBottom: 10
  }
});