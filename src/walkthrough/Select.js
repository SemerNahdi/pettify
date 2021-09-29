// @flow
import * as React from "react";
import {Dimensions, StyleSheet, ScrollView, TextInput, TouchableOpacity, View} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import {Text, Theme, Button} from "../components";
import Firebase from "../components/Firebase";
import TextInputComponent from "./TextInputComponent";
import autobind from "autobind-decorator";

type VisibleState = { visible: boolean };
type PetNameTextInputIsVisibleState = { petNameTextInputIsVisible: boolean };
type SpeciesSelected = { speciesSelected: string };
type Pet = { label: string, image: string };

var width = Dimensions.get('window').width; //full width

export default class Select extends React.Component<VisibleState, PetNameTextInputIsVisibleState, SpeciesSelected> {
    state = {
        visible: false,
        petNameTextInputIsVisible: false,
        speciesSelected: "",
        species: "",
        name: "", 
        breed: "",
        age: "",
        sex: "",
        isMale: true,
        isFemale: true,
    };

    static pets: Pet[] = [
        { label: "Dog", image: "dog" },
        { label: "Cat", image: "cat" },
        { label: "Bird", image: "dove" },
        { label: "Horse", image: "horse" },
        { label: "Fish", image: "fish" },
        { label: "Exotic", image: "spider" }
    ];

    @autobind
    addPetToFireStore() {
        var pet_uid = this.guidGenerator();
        const { uid } = Firebase.auth.currentUser;
        var owner_uid = uid;
        var pic = "null";
        const {species, breed, name, age, sex} = this.state;
        var checkForInputs = [species, breed, name, age, sex];

        //Checks to see if any inputs are not filled out
        for (let i = 0; i < checkForInputs.length; i++)
        {
            if (checkForInputs[i] == null)
            {
                alert("Fill all fields");
                return;
            }
        }

        var docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid);

        //Add pet to firestore
        docRef.get().then((doc) => {
            if (doc.exists) {
                this.addPetToFireStore();
            } else {
                Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid).set({
                    species, breed, name, age, sex, pic, owner_uid
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        console.log("Added pet to firestore");
        this.props.navigateHome();
    }

    //Generate pet ids
    @autobind
    guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }

    hide() {
        this.setState({ visible: false });
    }

    show() {
        this.setState({ visible: true });
    }

    selectDog = () => {
        this.setState({ speciesSelected: Select.pets[0].image });
        this.setState({ species: "Dog" });
    }

    selectCat = () => {
        this.setState({ speciesSelected: Select.pets[1].image });
        this.setState({ species: "Cat" });
    }

    selectBird = () => {
        this.setState({ speciesSelected: Select.pets[2].image });
        this.setState({ species: "Bird" });
    }

    selectHorse = () => {
        this.setState({ speciesSelected: Select.pets[3].image });
        this.setState({ species: "Horse" });
    }

    selectFish = () => {
        this.setState({ speciesSelected: Select.pets[4].image });
        this.setState({ species: "Fish" });
    }

    selectExotic = () => {
        this.setState({ speciesSelected: Select.pets[5].image });
        this.setState({ species: "Exotic" });
    }

    updateSex(sex) {
        let turnOff = {
          isMale: false,
          isFemale: false,
        }
    
        turnOff[sex] = true;
    
        this.setState(
          turnOff
        );
    
        if(sex=="isFemale") {
          this.setState({sex: "female"})
        }
        else {
          this.setState({sex: "male"})
        }
      }
    
      handleName = (text) => {
        this.setState({name: text})
      }
    
      handleBreed = (text) => {
        this.setState({breed: text});
      }
    
      handleAge = (text) => {
        this.setState({age: text})
      }
    

    render(): React.Node {
        const selectPetBreedMessage = <Text style={styles.message}>Please select the breed of your first pet. </Text>;

        var selectedPet = <FontAwesome5 name={this.state.speciesSelected} size={Theme.typography.header1.fontSize} color={Theme.palette.white} />

        if (!this.state.visible) {
            return <View />;
        }

        return (
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.image}>
                    {this.state.species != "" ? selectedPet : <Text /> }
                </View>
                <View style={styles.container}>
                    <Button
                    label="Dog"
                    onPress={this.selectDog}
                    full
                    style="primary"
                      />
                    <Button
                    label="Cat"
                    onPress={this.selectCat}
                    full
                    style="primary"
                      />
                    <Button
                    label="Bird"
                    onPress={this.selectBird}
                    full
                    style="primary"
                    />
                </View>
                <View style={styles.container}>
                    <Button
                        label="Horse"
                        onPress={this.selectHorse}
                        full
                        style="primary"
                    />
                    <Button
                        label="Fish"
                        onPress={this.selectFish}
                        full
                        style="primary"
                    />
                    <Button
                        label="Exotic"
                        onPress={this.selectExotic}
                        full
                        style="primary"
                    />
                </View>
                {/* <View style={{marginTop: Theme.spacing.large}}> */}
                {/* Removed marginTop ^ because TextInput and button was being covered by white bottom slide container */}
                <View>
                    {this.state.petNameTextInputIsVisible ? <TextInputComponent /> : selectPetBreedMessage}
                </View>

            <View style={styles.cardContainer}>
                <View style={styles.inputContainer}>
                <Text style={{
                    padding: 5,
                }}>Name:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleName}
                    returnKeyType = 'done'
                    defaultValue = {this.state.name}
                /> 
                </View>

                <View style={styles.inputContainer}>
                <Text style={{
                    padding: 5,
                }}>Breed:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleBreed}
                    returnKeyType = 'done'
                    defaultValue = {this.state.breed}
                /> 
                </View>

                <View style={styles.inputContainer}>
                <Text style={{
                    padding: 5,
                }}>Age:</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={this.handleAge}
                    returnKeyType = 'done'
                    defaultValue = {this.state.age}
                /> 
                </View>

                <View style={styles.inputContainer}>
                <Text style={{
                    padding: 5,
                }}>Sex:</Text>

                {this.state.isMale &&
                <TouchableOpacity onPress={() => this.updateSex("isMale")}>
                    <FontAwesome5 name="mars" size={30} color="#009dff" /> 
                </TouchableOpacity>
                }
                {this.state.isFemale &&
                <TouchableOpacity onPress={() => this.updateSex("isFemale")}>
                    <FontAwesome5 name="venus" size={30} color="#e75480" /> 
                </TouchableOpacity>
                }

                <View/>
                <View/>
                <View/>
                <View/>
                <View/>

                </View>
                <TouchableOpacity
                style={styles.submitButton}
                  onPress={this.addPetToFireStore}
                >
                <Text>
                    Add Pet!
                </Text>
            </TouchableOpacity>
            </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 283,
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginVertical: Theme.spacing.base
    },
    cardContainer: {
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
        paddingTop: 10,
    },
    input: {
        backgroundColor: "#FAFAFA",
        width: 300,
        right:0,
      },
    inputContainer: {
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10,
    },
    scrollContainer: {
        alignItems: "center",
        height: 600,
    },
    submitButton:{
        backgroundColor: '#81f1f7',
        alignSelf: 'center',
        padding: 10,
      },
    image: {
        padding: 10
    },
    message: {
        color: Theme.palette.black,
        fontSize: 20,
        fontFamily: Theme.typography.semibold,
        textAlign: "center",
        marginBottom: Theme.spacing.base
    }
});
