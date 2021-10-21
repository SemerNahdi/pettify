import React from 'react';
import { StyleSheet, TextInput, Animated, Dimensions, Keyboard, UIManager, ScrollView } from "react-native";
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
            speciesOpen: false,
            sex: null,
            sexOpen: false,
            age: null,
            ageOpen: false,
            size: null,
            sizeOpen: false,
            activity: null,
            activityOpen: false,
            classification: null,
            classificationOpen: false,
            spayNeuter_Status: null,
            spayNeuter_StatusOpen: false,
            pregnancy: null,
            pregnancyOpen: false,
            lactating: null,
            lactatingOpen: false,
        };

        navigation = this.props.navigation;
        uid = navigation.state.params.uid;
    }

    setAllClose = () => {
        this.setState({speciesOpen: false})
        this.setState({sexOpen: false})
        this.setState({ageOpen: false})
        this.setState({sizeOpen: false})
        this.setState({activityOpen: false})
        this.setState({classificationOpen: false})
        this.setState({spayNeuter_StatusOpen: false})
        this.setState({pregnancyOpen: false})
        this.setState({lactatingOpen: false})
    }

    setSpeciesValue = (callback) => {
        this.setState( item => ({
            species: callback(item.label)
        }))
    }

    setSexValue = (callback) => {
        this.setState( item => ({
            sex: callback(item.label)
        }))
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

    setClassificationValue = (callback) => {
        this.setState( item => ({
            classification: callback(item.label)
        }))
    }

    setSpayNeuter_StatusValue = (callback) => {
        this.setState( item => ({
            spayNeuter_Status: callback(item.label)
        }))
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
            <ScrollView style={styles.scroll} persistentScrollbar={false} >  
                <NavHeaderWithButton title="Add Pet" buttonIcon="check" buttonFn={this.addPetToFireStore} back backFn={() => this.props.navigation.goBack()} {...{ navigation }}/>

                <Text>Name:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleName}
                    returnKeyType = 'done'
                /> 

                <Text>Breed:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleBreed}
                    returnKeyType = 'done'
                />

                <Text>Weight (kg):</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleWeight}
                    keyboardType="numeric"
                    returnKeyType = 'done'
                />

                <Text>Years Owned:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleYearsOwned}
                    keyboardType="numeric"
                    returnKeyType = 'done'
                />

                <Container style={styles.container}>
                    <DropDownPicker 
                        placeholder="Select a species"
                        value={this.state.species}
                        items={[{label: 'Dog', value: 'Dog'}, {label: 'Cat', value: 'Cat'}, {label: 'Bird', value: 'Bird'}]}
                        open={this.state.speciesOpen}
                        setOpen={(open) => { this.setAllClose(); this.setState({speciesOpen: open}) } }
                        setValue={this.setSpeciesValue}
                        listMode="SCROLLVIEW"
                        zIndex={9}
                        style={styles.dropdown}
                    />

                    <DropDownPicker 
                        placeholder="Select sex"
                        value={this.state.sex}
                        items={[{label: 'Male', value: 'Male'}, {label: 'Female', value: 'Female'}]}
                        open={this.state.sexOpen}
                        setOpen={(open) => { this.setAllClose(); this.setState({sexOpen: open}) } }
                        setValue={this.setSexValue}
                        listMode="SCROLLVIEW"
                        zIndex={8}
                        style={styles.dropdown}
                    />

                    <DropDownPicker 
                        placeholder="Select age group"
                        value={this.state.age}
                        items={[{label: '0 - 1 Months', value: '0 - 1 Months'}, {label: '1 - 4 Months', value: '1 - 4 Months'},{label: '4 - 8 Months', value: '4 - 8 Months'},{label: 'Adult', value: 'Adult'}]}
                        open={this.state.ageOpen}
                        setOpen={(open) => { this.setAllClose(); this.setState({ageOpen: open}) } }
                        setValue={this.setAgeValue}
                        listMode="SCROLLVIEW"
                        zIndex={7}
                        style={styles.dropdown}
                    />

                    <DropDownPicker 
                        placeholder="Select size"
                        value={this.state.size}
                        items={[{label: 'Small', value: 'Small'}, {label:'Medium', value: 'Medium'},{label:'Large', value: 'Large'},{label:'X-Large', value: 'X-Large'}]}
                        open={this.state.sizeOpen}
                        setOpen={(open) => { this.setAllClose(); this.setState({sizeOpen: open}) } }
                        setValue={this.setSizeValue}
                        listMode="SCROLLVIEW"
                        zIndex={6}
                        style={styles.dropdown}
                    />

                    <DropDownPicker 
                        placeholder="Select activity level"
                        value={this.state.activity}
                        items={[{label: 'Inactive', value: 'Inactive'}, {label: 'Mild', value: 'Mild'},{label: 'Moderate', value: 'Moderate'},{label: 'High', value: 'High'}]}
                        open={this.state.activityOpen}
                        setOpen={(open) => { this.setAllClose(); this.setState({activityOpen: open}) } }
                        setValue={this.setActivityValue}
                        listMode="SCROLLVIEW"
                        zIndex={5}
                        style={styles.dropdown}
                    />

                    <DropDownPicker 
                        placeholder="Select living space"
                        value={this.state.classification}
                        items={[{label: 'Indoor', value: 'Indoor'}, {label: 'Outdoor', value: 'Outdoor'}]}
                        open={this.state.classificationOpen}
                        setOpen={(open) => { this.setAllClose(); this.setState({classificationOpen: open}) } }
                        setValue={this.setClassificationValue}
                        listMode="SCROLLVIEW"
                        zIndex={4}
                        style={styles.dropdown}
                    />

                    <DropDownPicker 
                        placeholder="Select Spayed/Neutered status"
                        value={this.state.spayNeuter_Status}
                        items={[{label: 'Intact', value: 'Intact'}, {label: 'Spayed/Neutered', value: 'Spayed/Neutered'}]}
                        open={this.state.spayNeuter_StatusOpen}
                        setOpen={(open) => { this.setAllClose(); this.setState({spayNeuter_StatusOpen: open}) } }
                        setValue={this.setSpayNeuter_StatusValue}
                        listMode="SCROLLVIEW"
                        zIndex={3}
                        style={styles.dropdown}
                    />

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
                </Container>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        margin: 6,
        borderWidth: 1,
        paddingTop: 0,
        textAlign: 'left'
    },  
    scroll: {
        backgroundColor: '#FFF',
    },
    container: {
        margin: 6,
    },
    dropdown: {
        marginBottom: 12,
    }
});
