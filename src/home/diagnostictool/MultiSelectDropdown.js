import * as React from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Theme, Button } from "../../components";
import Firebase from "../../components/Firebase";
import DropDownPicker from 'react-native-dropdown-picker';

export default class MultiSelectDropdown extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        items: [],
        selectedItems: [],
        open: false,
        diagnoseButtonIsVisible: true,
      };
      this.selectPet = this.selectPet.bind(this);
  }

  static dogSymptoms = [
    { label: "Abdominal pain", value: "Abdominal pain" }, 
    { label: "Anorexia", value: "Anorexia" }, 
    { label: "Blood in the urine", value: "Blood in the urine" }, 
    { label: "Clear nasal discharge", value: "Clear nasal discharge" }, 
    { label: "Convulsions", value: "Convulsions" }, 
    { label: "Coughing", value: "Coughing" }, 
    { label: "Decreased appetite", value: "Decreased appetite" }, 
    { label: "Depression", value: "Depression" }, 
    { label: "Dermatitis", value: "Dermatitis" }, 
    { label: "Diarrhea", value: "Diarrhea" }, 
    { label: "Discoloration of the gums", value: "Discoloration of the gums" }, 
    { label: "Existence of an external agent on the skin", value: "Existence of an external agent on the skin" }, 
    { label: "Eye redness", value: "Eye redness" }, 
    { label: "Fallen jaw", value: "Fallen jaw" }, 
    { label: "Fever", value: "Fever" }, 
    { label: "Frequent changes in behavior", value: "Frequent changes in behavior" }, 
    { label: "High temperature", value: "High temperature" }, 
    { label: "Inability to swallow", value: "Inability to swallow" }, 
    { label: "Inflammation of the brain and spinal cord", value: "Inflammation of the brain and spinal cord" }, 
    { label: "Intense breathing", value: "Intense breathing" }, 
    { label: "Lack of coordination", value: "Lack of coordination" }, 
    { label: "Lack of energy", value: "Lack of energy" }, 
    { label: "Lethargy", value: "Lethargy" }, 
    { label: "Muscular pain", value: "Muscular pain" }, 
    { label: "Paralysis", value: "Paralysis" }, 
    { label: "Purulent eye discharge", value: "Purulent eye discharge" }, 
    { label: "Pustular dermatitis (rarely)", value: "Pustular dermatitis (rarely)" }, 
    { label: "Runny nose", value: "Runny nose" }, 
    { label: "Severe itching", value: "Severe itching" }, 
    { label: "Shyness or aggression", value: "Shyness or aggression" }, 
    { label: "Sneezing", value: "Sneezing" }, 
    { label: "Stomach ache", value: "Stomach ache" }, 
    { label: "Vomiting", value: "Vomiting" }, 
    { label: "Wounds in the mouth", value: "Wounds in the mouth" }
  ];

  static catSymptoms = [
    { label: "Anorexia", value: "Anorexia" }, 
    { label: "Arthritis (inflammation of the joints)", value: "Arthritis (inflammation of the joints)" }, 
    { label: "Bloody diarrhea", value: "Bloody diarrhea" }, 
    { label: "Bloody vomiting", value: "Bloody vomiting" }, 
    { label: "Conjunctival chemosis", value: "Conjunctival chemosis" }, 
    { label: "Conjunctivitis", value: "Conjunctivitis" }, 
    { label: "Crying when urinating", value: "Crying when urinating" }, 
    { label: "Decreased appetite", value: "Decreased appetite" }, 
    { label: "Dehydration", value: "Dehydration" }, 
    { label: "Depression", value: "Depression" }, 
    { label: "Difficulty breathing", value: "Difficulty breathing" }, 
    { label: "Discharge from the eyes", value: "Discharge from the eyes" }, 
    { label: "Freckles on cat skin", value: "Freckles on cat skin" }, 
    { label: "Hair loss", value: "Hair loss" }, 
    { label: "High fever", value: "High fever" }, 
    { label: "Infection", value: "Infection" }, 
    { label: "Lethargy", value: "Lethargy" }, 
    { label: "Licking the urinary tract (usually due to pain)", value: "Licking the urinary tract (usually due to pain)" }, 
    { label: "Nasal discharge", value: "Nasal discharge" }, 
    { label: "Permanent body licking", value: "Permanent body licking" }, 
    { label: "Persistent itching of the body", value: "Persistent itching of the body" }, 
    { label: "Pneumonia (lung infection)", value: "Pneumonia (lung infection)" }, 
    { label: "Presence of blood in the urine", value: "Presence of blood in the urine" }, 
    { label: "Redness and irritation of the skin", value: "Redness and irritation of the skin" }, 
    { label: "Serious to purulent mucus from the nose and eyes", value: "Serious to purulent mucus from the nose and eyes" }, 
    { label: "Skin infections and inflamed red spots on the skin", value: "Skin infections and inflamed red spots on the skin" }, 
    { label: "Sneezing", value: "Sneezing" }, 
    { label: "Struggle and discomfort when urinating", value: "Struggle and discomfort when urinating" }, 
    { label: "Urination in unusual places", value: "Urination in unusual places" }, 
    { label: "Very severe gastrointestinal symptoms", value: "Very severe gastrointestinal symptoms" }, 
    { label: "Vomiting", value: "Vomiting" }, 
    { label: "Walking with pain", value: "Walking with pain" }, 
    { label: "Wounds around the mouth, soft palate, nose tip, lips, or around the paws", value: "Wounds around the mouth, soft palate, nose tip, lips, or around the paws" }
  ];

  static birdSymptoms = [
    { label: "Anorexia", value: "Anorexia" }, 
    { label: "Ataxia (loss of balance)", value: "Ataxia (loss of balance)" }, 
    { label: "Blindness", value: "Blindness" }, 
    { label: "Blood in the stool", value: "Blood in the stool" }, 
    { label: "Decreased appetite", value: "Decreased appetite" }, 
    { label: "Decreased egg production", value: "Decreased egg production" }, 
    { label: "Depression", value: "Depression" }, 
    { label: "Difficulty eating", value: "Difficulty eating" }, 
    { label: "Dirty feathers and dangling wings", value: "Dirty feathers and dangling wings" }, 
    { label: "Discharge from the beak", value: "Discharge from the beak" }, 
    { label: "Drowsiness", value: "Drowsiness" }, 
    { label: "Egg abnormality (egg size, shape and color)", value: "Egg abnormality (egg size, shape and color)" }, 
    { label: "Eye discharge", value: "Eye discharge" }, 
    { label: "Green diarrhea", value: "Green diarrhea" }, 
    { label: "Increased urination (polyuria)", value: "Increased urination (polyuria)" }, 
    { label: "Loose diarrhea and watery stools", value: "Loose diarrhea and watery stools" }, 
    { label: "Nasal discharge", value: "Nasal discharge" }, 
    { label: "Paralysis of limbs and wings", value: "Paralysis of limbs and wings" }, 
    { label: "Respiratory problems such as wheezing", value: "Respiratory problems such as wheezing" }, 
    { label: "Swelling of the soles of the feet and joints", value: "Swelling of the soles of the feet and joints" }, 
    { label: "Torticoline (twisting of the head and neck)", value: "Torticoline (twisting of the head and neck)" }, 
    { label: "Weakness", value: "Weakness" }
  ];

  selectPet = (species) => {
    switch(species) {
      case "Dog":
        this.setState({ items: MultiSelectDropdown.dogSymptoms, selectedItems: [] });
        break;
      case "Cat":
        this.setState({ items: MultiSelectDropdown.catSymptoms, selectedItems: [] });
        break;
      case "Bird":
        this.setState({ items: MultiSelectDropdown.birdSymptoms, selectedItems: [] });
        break;
      default:
        this.setState({ items: species });
    }
  }

  // Check if all of the elements in selected symptoms exist in the list of symptoms of a disease in Firestore then return those diseases
  searchForSymptomsInFirestore = (event, symptoms) => {
    let diagnoses = [];
    const { uid } = Firebase.auth.currentUser;

    Firebase.firestore
    .collection("diseases")
    .get()
    .then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        if(this.state.selectedItems.every(symptom => doc.data().symptoms.includes(symptom))){
          diagnoses.push(doc.id);
        }
      });
      
      this.props.navigation.navigate("DiagnosticToolResults", { diagnoses });
    });
  }

  setItemValue = (callback) => {
    var value = callback([this.state])[1];
    let array = [...this.state.selectedItems];
    var index = array.indexOf(value)
    
    if(array.length >= 10)
    {
      alert("Too many symptoms selected")
    }
    else if(index > -1)
    {
      array.splice(index, 1)
      this.setState({selectedItems: array})
    }
    else
    {
      array.push(value)
      this.setState({selectedItems: array})
    }
  }

  badgePress = (value) => {
    let array = [...this.state.selectedItems];
    var index = array.indexOf(value)
    
    if(index > -1)
    {
      array.splice(index, 1)
      this.setState({selectedItems: array})
    }
  }

  render() {
    const { items, selectedItems } = this.state;

    return (
      <>
        <View style={styles.multiSelectOptionsContainer}>

          <DropDownPicker 
            placeholder="Select Symptoms"
            multiple={true}
            multipleText={this.state.selectedItems.length + " symptom(s) have been selected"}
            searchable={true}
            searchContainerStyle={styles.searchContainer}
            searchTextInputStyle={styles.searchInput}
            items={this.state.items}
            value={this.state.selectedItems}
            setValue={this.setItemValue}
            open={this.state.open}
            setOpen={(open) => { this.setState({open: open}) } }
            zIndex={2}
          />
          
          <View style={styles.container}>
          {
            this.state.selectedItems.map((item, key) => {
              return(
                <TouchableOpacity key={key} style={styles.badgeStyle} onPress={() => {this.badgePress(item)}}>
                  <View style={styles.badgeDotStyle} />
                  <Text> {item} </Text>
                </TouchableOpacity>
              )
            })
          }

          </View>
          {
            this.state.selectedItems.length > 3 && 
            <Button
              style="diagnosis"
              label="Diagnose My Pet!"
              onPress={(e) => this.searchForSymptomsInFirestore(e, this.state.selectedItems)}
              full
            />
          }
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  badgeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#dfdfdf',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginTop: 5
  },
  badgeDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 10 / 2,
    backgroundColor: '#808080'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  searchContainer: {
    borderBottomColor: Theme.palette.lightGray,
    padding:4
  },
  searchInput: {
    borderColor: Theme.palette.white,
    fontSize: 16,
  }
});