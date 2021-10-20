import React from 'react';
import { StyleSheet, TextInput, Animated, Dimensions, Keyboard, UIManager, ScrollView } from "react-native";
import { Text, Theme, NavHeaderWithButton } from "../../components";
import { FontAwesome5 } from '@expo/vector-icons';
import Firebase from "../../components/Firebase";
import { Dropdown } from 'react-native-material-dropdown-v2'

const { State: TextInputState } = TextInput;

export default class AddPets extends React.Component<> {
    constructor(props) {
        super(props);
        this.state = {
            species: null,
            breed: null,
            name: null,
            age: null,
            yearsOwned: null, 
            sex: null,
            activity: null,
            size: null,
            lactating: null,
            pregnancy: null,
            classification: null,
            spayNeuter_Status: null,
            weight: null
        };
        navigation = this.props.navigation;
        uid = navigation.state.params.uid;
    }
    
    handleYearsOwned = (text) => {
        this.setState({yearsOwned: text})
    }

    handleBreed = (text) => {
        this.setState({breed: text})
    }

    handleName = (text) => {
        this.setState({name: text})
    }
    
    handleWeight = (text) => {
        this.setState({weight: text})
    }

    addPetToFireStore = (event) =>{
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

        var docRef = Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid);

        //Add pet to firestore
        docRef.get().then((doc) => {
            if (doc.exists) {
                this.addPetToFireStore();
            } else {
                Firebase.firestore.collection("users").doc(uid).collection("pets").doc(pet_uid).set({
                    species, breed, name, age, yearsOwned, sex, activity, weight, classification, spayNeuter_Status,
                    pregnancy, lactating, size, pic, uid 
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        navigation.goBack();
    }

    //Generate pet ids
    guidGenerator = (event) => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
    }

    //Handles keyboard stuff
    handleKeyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window');
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
          const fieldHeight = height;
          const fieldTop = pageY;
          const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
          if (gap >= 0) {
            return;
          }
          Animated.timing(
            this.state.shift,
            {
              toValue: gap,
              duration: 300,
              useNativeDriver: true,
            }
          ).start();
        });
    }
    
      handleKeyboardDidHide = () => {
        Animated.timing(
          this.state.shift,
          {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }
        ).start();
    }
    

    render() {
       // const { shift } = this.state;

        return (
            <ScrollView style={styles.scroll} persistentScrollbar={false} > 
                <NavHeaderWithButton title="Add Pet" back {...{ navigation }} buttonFn={this.addPetToFireStore} buttonIcon="check" />

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

               <Dropdown
                    label='Select a species'
                    let data={[{
                        value: 'Dog'
                        }, {
                        value: 'Cat'
                        }, {
                        value: 'Bird'
                        }]}
                    value={this.state.species}
                        onChangeText={ (value) => {
                        this.setState({species : value});
                        }}
                />
               <Dropdown
                    label='Select sex'
                    data={[{
                        value: 'Female'
                        }, {
                        value: 'Male'
                        }]}

                    value={this.state.sex }
                    onChangeText={ (value) => {
                        this.setState({sex : value});
                        }}

                />
                <Dropdown
                    label='Select age group'
                    data={[{
                        value: '0 - 1 Months'
                    }, {
                        value: '1 - 4 Months'
                    },
                    {
                        value: '4 - 8 Months'
                    },{
                        value: 'Adult'
                    }
                    ]}
                    value={this.state.age}
                    onChangeText={ (value) => {
                        this.setState({age : value});
                        }}
                    />

                <Dropdown
                    label='Select size'
                    data={[{
                        value: 'Small'
                    }, {
                        value: 'Medium'
                    },
                    {
                        value: 'Large'
                    },{
                        value: 'X-Large'
                    }
                    ]}
                    value={this.state.size }
                    
                    onChangeText={ (value) => {
                        this.setState({size : value});
                        }}
                />
                <Dropdown
                    label='Select activity level'
                    data={[{
                        value: 'Inactive'
                    }, {
                        value: 'Mild'
                    },
                    {
                        value: 'Moderate'
                    },{
                        value: 'High'
                    }
                    ]}
                    value={this.state.activity } 
                    onChangeText={ (value) => {
                        this.setState({activity : value});
                        }} 
                    
                />   
                <Dropdown
                    label='Select living space'
                    data={[{
                        value: 'Indoor'
                    }, {
                        value: 'Outdoor'
                    }]}
                    value={this.state.classification }

                    onChangeText={ (value) => {
                        this.setState({classification : value});
                        }}
                />   
                <Dropdown
                    label='Select Spayed/Neutered status'
                    data={[{
                        value: 'Intact'
                    }, {
                        value: 'Spayed/Neutered'
                    }]}
                    value={this.state.spayNeuter_Status }
                    onChangeText={ (value) => {
                        this.setState({spayNeuter_Status : value});
                        }}
                /> 
          
                <Dropdown
                    label='Select duration of pregnancy'
                    data={[{
                        value: 'Not Pregnant'
                    }, {
                        value: '0 - 5 Weeks'
                    },
                    {
                        value: '5 - 10 Weeks'
                    }, {
                        value: '10+ Weeks'
                    }
                
                    ]}
                    value ={this.state.pregnancy} 
                
                    onChangeText={(value)=> this.setState({pregnancy : value})} 
                               
                /> 

                <Dropdown
                    label='Select duration of lactation'
                    data={[{
                        value: 'Non Lactating'
                    }, {
                        value: '0 - 1 Weeks'
                    },
                    {
                        value: '1 - 3 Weeks'
                    }, {
                        value: '3 - 5+ Weeks'
                    }
                
                    ]}
                    value={this.state.lactating }
                    onChangeText={ (value) => {
                        this.setState({lactating : value});
                    }}
                /> 


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
});
