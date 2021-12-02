import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Theme, NavHeader, Text, Button } from "../../../components";
import Separator from "../Separator"
import Firebase from "../../../components/Firebase";
 
export default class PetDiet extends Component<> {

  constructor(props) {
    super(props);
    this.state = {
      role: "",
      selectedDiet: [],
      existentDiet: [],
      existentDietU: [],
      dietToString: null,  
      dietDetails: null,
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
 
  setDietDetails = (dietDetails) => {
    this.setState({dietDetails: dietDetails});
  }
 
  arrayToString = () => {
    this.state.dietToString = JSON.stringify(this.state.selectedDiet);
    this.state.dietToString = this.state.dietToString.replace(/["]+/g, '');
  }
 
  saveDietToFireStore = () => {

    //Checks to see if any inputs are not filled out
    if(this.state.selectedDiet.length === 0 || this.state.dietDetails === null){
      alert("Fill all fields");
      return;
    }
 
    this.arrayToString();
    var date = new Date().toISOString();

    //Add pet to firestore
    Firebase.firestore
    .collection("users")
    .doc(uid)
    .collection("pets")
    .doc(pet_uid)
    .collection("diet")
    .doc(date)
    .set({
      date: new Date(),
      diet: this.state.dietToString,
      dietDetails: this.state.dietDetails
    })
    .then((res) => {
      this.state.dietDetails = null;
      this.state.dietToString = null;
      this.state.selectedDiet = [];
      this.retrieveFireStoreDiet();
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  saveDietToFireStoreU = () => {
 
    //Checks to see if any inputs are not filled out
    if(this.state.selectedDiet.length === 0 || this.state.dietDetails === null){
      alert("Fill all fields");
      return;
    }

    this.arrayToString();
 
    var date = new Date().toISOString();
    //Add pet to firestore
    Firebase.firestore
    .collection("users")
    .doc(uid)
    .collection("pets")
    .doc(pet_uid)
    .collection("dietU")
    .doc(date)
    .set({
      date: new Date(),
      diet: this.state.dietToString,
      dietDetails: this.state.dietDetails
    })
    .then(() => {
      this.state.dietDetails = null;
      this.state.dietToString = null;
      this.state.selectedDiet = [];
      this.retrieveFireStoreDietU();
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
      snapshot.forEach((doc) => {
        this.state.existentDiet.push({
          diet: doc.data().diet,
          dietDetails: doc.data().dietDetails,
          date: new Date(doc.data().date.seconds*1000).toString()
        })
      })
    })
    .then(() => {
      this.setState({
        existentDiet: [...this.state.existentDiet.reverse()]
      })
    })
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
      snapshot.forEach((doc) => {
        this.state.existentDietU.push({
          diet: doc.data().diet,
          dietDetails: doc.data().dietDetails,
          date: new Date(doc.data().date.seconds*1000).toString()
        })
      })
    })
    .then(() => {
      this.setState({
        existentDietU: [...this.state.existentDietU.reverse()]
      })
    });
  }
 
  onItemSelect = (item) => {
    var array = [...this.state.selectedDiet]
    var index = array.indexOf(item)

    if(index > -1)
    {
      array.splice(index, 1)
      this.setState({selectedDiet: array})
    }
    else 
    {
      array.push(item)
      this.setState({selectedDiet: array})
    }
  }
 
  render() {
    return (
      <ImageBackground source={require('../../../../assets/pattern.png')} style={styles.container}>
      <NavHeader title="Diet" back backFn={() => this.props.navigation.goBack()} {...{ navigation }}/>
      <ScrollView style={styles.container}>
      
        <View style= {styles.dietHeading}>
          <Text style={styles.groupHeader}> {"Proteins:"} </Text>
        </View> 
 
        <View style= {styles.buttonContainer}>
          <Button label="Milk" onPress={() => this.onItemSelect("Milk")} style={this.state.selectedDiet.indexOf("Milk") > -1 ? "pressed" : "unpressed"} />
          <Button label="Fish" onPress={() => this.onItemSelect("Fish")} style={this.state.selectedDiet.indexOf("Fish") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Eggs" onPress={() => this.onItemSelect("Eggs")} style={this.state.selectedDiet.indexOf("Eggs") > -1 ? "pressed" : "unpressed"} />
          <Button label="Chicken" onPress={() => this.onItemSelect("Chicken")} style={this.state.selectedDiet.indexOf("Chicken") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Lamb" onPress={() => this.onItemSelect("Lamb")} style={this.state.selectedDiet.indexOf("Lamb") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.dietHeading}>
          <Text style={styles.groupHeader}> {"Carbohydrates:"} </Text>
        </View> 

        <View style= {styles.buttonContainer}>
          <Button label="Rice" onPress={() => this.onItemSelect("Rice")} style={this.state.selectedDiet.indexOf("Rice") > -1 ? "pressed" : "unpressed"} />
          <Button label="Oatmeal" onPress={() => this.onItemSelect("Oatmeal")} style={this.state.selectedDiet.indexOf("Oatmeal") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Corn" onPress={() => this.onItemSelect("Corn")} style={this.state.selectedDiet.indexOf("Corn") > -1 ? "pressed" : "unpressed"} />
          <Button label="Barley" onPress={() => this.onItemSelect("Barley")} style={this.state.selectedDiet.indexOf("Barley") > -1 ? "pressed" : "unpressed"} />
        </View>
        
        <View style= {styles.buttonContainer}>
          <Button label="Beet Pulp" onPress={() => this.onItemSelect("Beet Pulp")} style={this.state.selectedDiet.indexOf("Beet Pulp") > -1 ? "pressed" : "unpressed"} />
          <Button label="Cellulose" onPress={() => this.onItemSelect("Cellulose")} style={this.state.selectedDiet.indexOf("Cellulose") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Chicory Root" onPress={() => this.onItemSelect("Chicory Root")} style={this.state.selectedDiet.indexOf("Chicory Root") > -1 ? "pressed" : "unpressed"} />
          <Button label="Yeast Extract" onPress={() => this.onItemSelect("Yeast Extract")} style={this.state.selectedDiet.indexOf("Yeast Extract") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.dietHeading}>
          <Text style={styles.groupHeader}> {"Fats:"} </Text>
        </View> 

        <View style= {styles.buttonContainer}>
          <Button label="Soy Oil" onPress={() => this.onItemSelect("Soy Oil")} style={this.state.selectedDiet.indexOf("Soy Oil") > -1 ? "pressed" : "unpressed"} />
          <Button label="Canola Oil" onPress={() => this.onItemSelect("Canola Oil")} style={this.state.selectedDiet.indexOf("Canola Oil") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Fish Oil" onPress={() => this.onItemSelect("Fish Oil")} style={this.state.selectedDiet.indexOf("Fish Oil") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.dietHeading}>
          <Text style={styles.groupHeader}> {"Vitamins:"} </Text>
        </View> 

        <View style= {styles.buttonContainer}>
          <Button label="Vegetables" onPress={() => this.onItemSelect("Vegetables")} style={this.state.selectedDiet.indexOf("Vegetables") > -1 ? "pressed" : "unpressed"} />
          <Button label="Supplements" onPress={() => this.onItemSelect("Supplements")} style={this.state.selectedDiet.indexOf("Supplements") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Citrus" onPress={() => this.onItemSelect("Citrus")} style={this.state.selectedDiet.indexOf("Citrus") > -1 ? "pressed" : "unpressed"} />
          <Button label="Cereal" onPress={() => this.onItemSelect("Cereal")} style={this.state.selectedDiet.indexOf("Cereal") > -1 ? "pressed" : "unpressed"} />
        </View>
        
        <View style= {styles.buttonContainer}>
          <Button label="Brewers Yeast" onPress={() => this.onItemSelect("Brewers Yeast")} style={this.state.selectedDiet.indexOf("Brewers Yeast") > -1 ? "pressed" : "unpressed"} />
          <Button label="Liver" onPress={() => this.onItemSelect("Liver")} style={this.state.selectedDiet.indexOf("Liver") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Mineral Salt" onPress={() => this.onItemSelect("Mineral Salt")} style={this.state.selectedDiet.indexOf("Mineral Salt") > -1 ? "pressed" : "unpressed"} />
          <Button label="Bone" onPress={() => this.onItemSelect("Bone")} style={this.state.selectedDiet.indexOf("Bone") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Wheat" onPress={() => this.onItemSelect("Wheat")} style={this.state.selectedDiet.indexOf("Wheat") > -1 ? "pressed" : "unpressed"} />
          <Button label="Purified Supplement" onPress={() => this.onItemSelect("Purified Supplement")} style={this.state.selectedDiet.indexOf("Purified Supplement") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Carrots" onPress={() => this.onItemSelect("Carrots")} style={this.state.selectedDiet.indexOf("Carrots") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.dietHeading}>
          <Text style={styles.groupHeader}> {"Other:"} </Text>
        </View> 

        <View style= {styles.buttonContainer}>
          <Button label="Marigold Extract" onPress={() => this.onItemSelect("Marigold Extract")} style={this.state.selectedDiet.indexOf("Marigold Extract") > -1 ? "pressed" : "unpressed"} />
          <Button label="Cartilage" onPress={() => this.onItemSelect("Cartilage")} style={this.state.selectedDiet.indexOf("Cartilage") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style= {styles.buttonContainer}>
          <Button label="Crustaceans" onPress={() => this.onItemSelect("Crustaceans")} style={this.state.selectedDiet.indexOf("Crustaceans") > -1 ? "pressed" : "unpressed"} />
          <Button label="Green Tea Extract" onPress={() => this.onItemSelect("Green Tea Extract")} style={this.state.selectedDiet.indexOf("Green Tea Extract") > -1 ? "pressed" : "unpressed"} />
        </View>

        <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setDietDetails(text)}
            returnKeyType = 'done'
            multiline={true}
            placeholder="Diet Details"
            value = {this.state.dietDetails}
          /> 
        </View>
 
        {this.state.role == 'v' &&
          <View style={styles.submitContainer}>
            <Button label="Save Diet" onPress={this.saveDietToFireStore} style="secondary" />
          </View>
        }

        {this.state.role == 'p' &&
          <View style={styles.submitContainer}>
            <Button label="Save Diet" onPress={this.saveDietToFireStoreU} style="secondary" />
          </View>
        }

        <Text type="header3"> Suggested Diet </Text>
          {
            this.state.existentDiet.length === 0 && (
              <View style={styles.centerText}>
                <Text type="large"> No Diets to show </Text>
              </View>
            )
          }
          {
            this.state.existentDiet.map((element, k) => {
              return(
                <View key={k} style={styles.dietContainer}>
                  <Text> Diet: {element.diet}</Text>
                  <Text> Details: {element.dietDetails}</Text>
                  <Text> Date: {element.date}</Text>
                </View>
              )
            })
          }
         
        <Text type="header3"> User Diet </Text>
          {
            this.state.existentDietU.length === 0 && (
              <View style={styles.centerText}>
                <Text type="large"> No Diets to show </Text>
              </View>
            )
          }
          {
            this.state.existentDietU.map((element, k) => {
              return (
                <View key={k} style={styles.dietContainer}>
                  <Text> Diet: {element.diet}</Text>
                  <Text> Details: {element.dietDetails}</Text>
                  <Text> Date: {element.date}</Text>
                </View>
              )
            })
          }
      </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll'
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 5,
  },
  submitContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25
  },
  dietContainer: {
    padding:5,
    backgroundColor: Theme.palette.white,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 4

  },
  textContainer: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Theme.palette.black,
    borderRadius: 8,
    marginVertical: 7,
    marginHorizontal: 7,
    backgroundColor: Theme.palette.white
  },
  input: {
    height: 70,
    margin: 2,
    textAlign: 'left',
  },
  dietHeading: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 2
  },
  groupHeader:{
    fontSize:20
  },
  centerText:{
    flexDirection:"row",
    justifyContent:"center",
    paddingBottom: 10
  }
});