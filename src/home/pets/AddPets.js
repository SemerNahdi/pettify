import React from 'react';
import { StyleSheet, TextInput, Animated, Dimensions, Keyboard, UIManager, ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Theme, NavHeaderWithButton, Container } from "../../components";
import { FontAwesome5 } from '@expo/vector-icons';
import Firebase from "../../components/Firebase";
import DropDownPicker from 'react-native-dropdown-picker';

const { State: TextInputState } = TextInput;

export default class AddPets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    }

    setAllClose = () => {
        this.setState({ageOpen: false})
        this.setState({sizeOpen: false})
        this.setState({activityOpen: false})
        this.setState({pregnancyOpen: false})
        this.setState({lactatingOpen: false})
    }

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
        this.setState({breed: text})
    }
    
    handleWeight = (text) => {
        this.setState({weight: text})
    }

    handleYearsOwned = (text) => {
        this.setState({yearsOwned: text})
    }

    addPetToFireStore = () => {
        pet_uid = this.guidGenerator();
        var pic = "null";
        const {species, breed, name, age, yearsOwned, sex, activity, weight, 
                classification, spayNeuter_Status, pregnancy, lactating, size} = this.state; 
        var checkForInputs = [species, breed, name, age, yearsOwned, sex, activity, weight, 
                                classification, spayNeuter_Status, pregnancy, lactating, size];

        //Checks to see if any inputs are not filled out
        for (let i = 0; i < checkForInputs.length; i++)
        {
            if (checkForInputs[i] == null)
            {
                alert("Fill all fields");
                return;
            }
        }
        
        //Add pet to firestore
        Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid).set({
            species, breed, name, age, yearsOwned, sex, activity, weight, classification, spayNeuter_Status,
            pregnancy, lactating, size, pic, uid 
        })
        .then(() => {
            navigation.state.params.onGoBack();
            navigation.goBack();
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    //Generate pet ids
    guidGenerator = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }

    render() {
        const { shift } = this.state;

        return (
            <ScrollView persistentScrollbar={false} >  
                <NavHeaderWithButton title="Add Pet" buttonIcon="check" buttonFn={this.addPetToFireStore} back backFn={() => this.props.navigation.goBack()} {...{ navigation }}/>
                <View style={styles.form}>
                    <Text>Name:</Text>
                    <View style={styles.textContainer}>
                        <TextInput
                            placeholder="Enter Name"
                            placeholderTextColor={Theme.palette.black}
                            style={styles.input}
                            onChangeText={this.handleName}
                            returnKeyType = 'done'
                        /> 
                    </View>

                    <Text>Breed:</Text>
                    <View style={styles.textContainer}>
                        <TextInput
                            placeholder="Enter Breed"
                            placeholderTextColor={Theme.palette.black}
                            style={styles.input}
                            onChangeText={this.handleBreed}
                            returnKeyType = 'done'
                        />
                    </View>

                    <Text>Weight (kg):</Text>
                    <View style={styles.textContainer}>
                        <TextInput
                            placeholder="Enter Weight"
                            placeholderTextColor={Theme.palette.black}
                            style={styles.input}
                            onChangeText={this.handleWeight}
                            keyboardType="numeric"
                            returnKeyType = 'done'
                        />
                    </View>

                    <Text>Years Owned:</Text>
                    <View style={styles.textContainer}>
                        <TextInput
                            placeholder="Enter Years Owned"
                            placeholderTextColor={Theme.palette.black}
                            style={styles.input}
                            onChangeText={this.handleYearsOwned}
                            keyboardType="numeric"
                            returnKeyType = 'done'
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

                    <Text>Age:</Text>
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

                    <Text>Activity:</Text>
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

                    {this.state.sex === "Female" && this.state.spayNeuter_Status === "Intact" && 
                    <>
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
                    </>
                    }

                    {this.state.sex === "Female" && this.state.spayNeuter_Status === "Intact" && this.state.pregnancy !== null && this.state.pregnancy !== "Not Pregnant" && 
                    <>
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
                    </>
                    }

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        margin: 2,
        textAlign: 'left'
    },  
    form: {
        paddingHorizontal: 8,
        paddingTop: 5,
        marginBottom: 45
    },
    dropdown: {
        marginVertical: 3,
    },
    textContainer: {
      paddingVertical: 7,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: Theme.palette.black,
      borderRadius: 8,
      marginVertical: 3
    },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 3
  },
});
