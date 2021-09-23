import React from 'react';
import { StyleSheet, TextInput, Animated, Dimensions, Keyboard, UIManager, ScrollView } from "react-native";
import { Text, Theme, NavHeaderWithButton } from "../../components";
import { FontAwesome5 } from '@expo/vector-icons';
import Firebase from "../../components/Firebase";
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from "expo-linear-gradient";

const { State: TextInputState } = TextInput;

export default class AddPets extends React.Component<> {
   
    async componentDidMount(): Promise<void> {
        const { navigation } = this.props;
    }

    //Handles moving screen up and down with keyboard
    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }
    
      componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
        this.props.navigation.state.params.getData(); //Reloads pets list when going back
    }

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
            weight: null,
            shift: new Animated.Value(0),
        };
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
        uid = this.props.navigation.state.params.cuid;
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

        this.props.navigation.goBack();
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
         
        const { navigation } = this.props;
        const { shift } = this.state;

        return (
            <ScrollView style={styles.scroll} persistentScrollbar={false} >  
                <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
                <NavHeaderWithButton title="Add Pet" back {...{ navigation }} buttonFn={this.addPetToFireStore} buttonIcon="check" />

                <DropDownPicker
                    items={[
                        {label: ' Dog', value: 'Dog', icon: () => <FontAwesome5 name="dog" size={18} color="#900" />},
                        {label: '  Cat', value: 'Cat', icon: () => <FontAwesome5 name="cat" size={18} color="#900" />},
                        {label: '  Bird', value: 'Bird', icon: () => <FontAwesome5 name="dove" size={18} color="#900" />},
                        {label: ' Horse', value: 'Horse', icon: () => <FontAwesome5 name="horse" size={18} color="#900" />},
                        {label: ' Fish', value: 'Fish', icon: () => <FontAwesome5 name="fish" size={18} color="#900" />},
                        {label: ' Exotic', value: 'Exotic', icon: () => <FontAwesome5 name="spider" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.species}
                    containerStyle={{height: 40, marginBottom: 150}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        species: item.value
                    })}
                    placeholder="Select a species"
                    isVisible={this.state.isVisible_Species}
                    onOpen={() => this.setState({
                        isVisible_Species: true
                    })}
                    onClose={() => this.setState({
                        isVisible_Species: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: ' Male', value: 'male', icon: () => <FontAwesome5 name="mars" size={18} color="#900" />},
                        {label: '  Female', value: 'female', icon: () => <FontAwesome5 name="venus" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.sex}
                    containerStyle={{height: 40, marginBottom: 80}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        sex: item.value
                    })}
                    placeholder="Select sex"
                    isVisible={this.state.isVisible_Sex}
                    onOpen={() => this.setState({
                        isVisible_Sex: true
                    })}
                    onClose={() => this.setState({
                        isVisible_Sex: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: '   0 - 1 Months', value: '0 - 1 Months', icon: () => <FontAwesome5 name="birthday-cake" size={12} color="#900" />},
                        {label: '   1 - 4 Months', value: '1 - 4 Months', icon: () => <FontAwesome5 name="birthday-cake" size={14} color="#900" />},
                        {label: '  4 - 8 Months', value: '4 - 8 Months', icon: () => <FontAwesome5 name="birthday-cake" size={16} color="#900" />},
                        {label: '  Adult', value: 'Adult', icon: () => <FontAwesome5 name="birthday-cake" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.age}
                    containerStyle={{height: 40, marginBottom: 142}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        age: item.value
                    })}
                    placeholder="Select age group"
                    isVisible={this.state.isVisible_Age}
                    onOpen={() => this.setState({
                        isVisible_Age: true
                    })}
                    onClose={() => this.setState({
                        isVisible_Age: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: '    Small', value: 'Small', icon: () => <FontAwesome5 name="dog" size={12} color="#900" />},
                        {label: '   Medium', value: 'Medium', icon: () => <FontAwesome5 name="dog" size={14} color="#900" />},
                        {label: '   Large', value: 'Large', icon: () => <FontAwesome5 name="dog" size={16} color="#900" />},
                        {label: '  X-Large', value: 'X-Large', icon: () => <FontAwesome5 name="dog" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.size}
                    containerStyle={{height: 40, marginBottom: 142}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        size: item.value
                    })}
                    placeholder="Select size"
                    isVisible={this.state.isVisible_Size}
                    onOpen={() => this.setState({
                        isVisible_Size: true
                    })}
                    onClose={() => this.setState({
                        isVisible_Size: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: ' Inactive', value: 'Inactive', icon: () => <FontAwesome5 name="bed" size={18} color="#900" />},
                        {label: '     Mild', value: 'Mild', icon: () => <FontAwesome5 name="male" size={18} color="#900" />},
                        {label: '    Moderate', value: 'Moderate', icon: () => <FontAwesome5 name="walking" size={18} color="#900" />},
                        {label: '   High', value: 'High', icon: () => <FontAwesome5 name="running" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.activity}
                    containerStyle={{height: 40, marginBottom: 148}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        activity: item.value
                    })}
                    placeholder="Select activty level"
                    isVisible={this.state.isVisible_Activity}
                    onOpen={() => this.setState({
                        isVisible_Activity: true
                    })}
                    onClose={() => this.setState({
                        isVisible_Activity: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: ' Indoors', value: 'Indoors', icon: () => <FontAwesome5 name="home" size={18} color="#900" />},
                        {label: '   Outdoors', value: 'Outdoors', icon: () => <FontAwesome5 name="tree" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.classification}
                    containerStyle={{height: 40, marginBottom: 80}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        classification: item.value
                    })}
                    placeholder="Select living space"
                    isVisible={this.state.isVisible_Classification}
                    onOpen={() => this.setState({
                        isVisible_Classification: true
                    })}
                    onClose={() => this.setState({
                        isVisible_Classification: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: ' Intact', value: 'Intact', icon: () => <FontAwesome5 name="ban" size={18} color="#900" />},
                        {label: ' Spayed/Neutered', value: 'Spayed/Neutered', icon: () => <FontAwesome5 name="check" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.spayNeuter_Status}
                    containerStyle={{height: 40, marginBottom: 80}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        spayNeuter_Status: item.value
                    })}
                    placeholder="Select Spayed/Neutered status"
                    isVisible={this.state.isVisible_SpayNeuter_Status}
                    onOpen={() => this.setState({
                        isVisible_SpayNeuter_Status: true
                    })}
                    onClose={() => this.setState({
                        isVisible_SpayNeuter_Status: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: ' Not Pregnant', value: 'Not Pregnant', icon: () => <FontAwesome5 name="ban" size={18} color="#900" />},
                        {label: '  0 - 5 Weeks', value: '0 - 5 Weeks', icon: () => <FontAwesome5 name="heart" size={14} color="#900" />},
                        {label: '  5 - 10 Weeks', value: '5 - 10 Weeks', icon: () => <FontAwesome5 name="heart" size={16} color="#900" />},
                        {label: ' 10+ Weeks', value: '10+ Weeks', icon: () => <FontAwesome5 name="heart" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.pregnancy}
                    containerStyle={{height: 40, marginBottom: 144}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        pregnancy: item.value
                    })}
                    placeholder="Select duration of pregnancy"
                    isVisible={this.state.isVisible_Pregnancy}
                    onOpen={() => this.setState({
                        isVisible_Pregnancy: true
                    })}
                    onClose={() => this.setState({
                        isVisible_Pregnancy: false
                    })}
                />

                <DropDownPicker
                    items={[
                        {label: ' Non Lactating', value: 'Non Lactating', icon: () => <FontAwesome5 name="ban" size={18} color="#900" />},
                        {label: '  0 - 1 Weeks', value: '0 - 1 Weeks', icon: () => <FontAwesome5 name="wine-bottle" size={14} color="#900" />},
                        {label: '  1 - 3 Weeks', value: '1 - 3 Weeks', icon: () => <FontAwesome5 name="wine-bottle" size={16} color="#900" />},
                        {label: ' 3 - 5+ Weeks', value: '3 - 5+ Weeks', icon: () => <FontAwesome5 name="wine-bottle" size={18} color="#900" />},
                    ]}
                    defaultValue={this.state.lactating}
                    containerStyle={{height: 40, marginBottom: 145}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        lactating: item.value
                    })}
                    placeholder="Select duration of lactation"
                    isVisible={this.state.isVisible_Lactating}
                    onOpen={() => this.setState({
                        isVisible_Lactating: true
                    })}
                    onClose={() => this.setState({
                        isVisible_Lactating: false
                    })}
                />

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
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: -500
    },
});
