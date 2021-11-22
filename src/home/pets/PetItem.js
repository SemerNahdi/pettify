PropTypes;
import autobind from "autobind-decorator";
import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
import {Theme, } from "../../components";

const { width, height } = Dimensions.get('window');

export default class ListItem extends Component {

  @autobind
  goToPetDetailView() {
    const pet_uid = this.props.pet_uid
    const uid = this.props.uid
    const onGoBack = this.props.onGoBack
    this.props.navigation.navigate("PetDetailView", { pet_uid, uid, onGoBack });
  }

  render() {
    const { name, pic ,species , breed, age, sex} = this.props; 
    var speciesColor;
    var petIcon;

    switch (species) {
      case "Cat":
				petIcon = "cat";
				speciesColor = Theme.palette.orange;
				break;
			case "Dog":
				petIcon = "dog";
				speciesColor = Theme.palette.blue;
				break;
			case "Bird":
				petIcon = "dove";
				speciesColor = Theme.palette.red;
				break;
			
			default:
				petIcon = "question";
				speciesColor = Theme.palette.black;
				break;
    }

    return (
      
      <TouchableOpacity onPress={this.goToPetDetailView}>
        <View style={styles.petItemContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: pic }} style={styles.picture}/>
          </View> 
          <View style={styles.column}>
            <Text style={styles.name}>
              {name}
            </Text>
            <Text style={styles.species}>
              {species}
            </Text>
            <Text style={styles.breed}>
              {breed}
            </Text>
            </View>
            <View style={styles.icon}>
            <FontAwesome5 name={sex=="Female" ? "venus" : "mars"} size={30} color={sex=="Female" ? "#e75480" : "#009dff"} />
            <FontAwesome5 name={petIcon} size={25} color={speciesColor} />
            </View>
            </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({  
    species: {
    paddingHorizontal: 20,
    fontWeight: '600',
    fontSize: 15,
    color: Theme.palette.washedBlue,
    flexDirection: 'row',
    width: width-100, 
  },
  breed: {
    paddingHorizontal: 20,
    fontWeight: '600',
    fontSize: 15,
    color: Theme.palette.washedBlue,
    flexDirection: 'row',
    width: width-100, 
  },
  
  name: {
    paddingHorizontal: 20,
    paddingBottom:2,
    fontWeight: '600',
    fontSize: 18,
    color: Theme.palette.black,
    flexDirection: 'row',
    width: width-100, 

  },
  icon:{
    right:80 ,
    padding: 5 ,
    alignItems: "center",
  },
  column: {
    height:20,
    justifyContent: 'center',
    flexDirection: 'column',
    
  },
  picture: {
    borderRadius: 50,
    height: 70,
    marginBottom: 1,
    marginTop: 1,
    width: 70,
  },
  imageContainer: {
    paddingRight: 1,
    paddingLeft: 100,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  petItemContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    flex: 0,
    margin: 9,
    flexDirection: 'row',    
    backgroundColor:Theme.palette.white,
    opacity:1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: .2,
    shadowRadius: .5,
    borderRadius: 10,
    borderWidth: .3,
    borderColor: Theme.palette.transparent,
    alignItems: "center",
    justifyContent: "center",
  }
})