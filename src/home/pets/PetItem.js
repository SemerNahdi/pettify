PropTypes;
import autobind from "autobind-decorator";
import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

export default class ListItem extends Component {

  @autobind
  goToPetDetailView() {
    const pet_uid = this.props.pet_uid
    const { getDataFunc } = this.props
    this.props.navigation.navigate("PetDetailView", { pet_uid });
  }

  render() {
    const { name, pic, color, seen, selected, key, id, species, breed, age, yearsOwned, sex, spayNeuter_Status, activity, 
            weight, classification, pregnancy, lactating, size } = this.props; 
    var speciesColor;
    var petIcon;

    switch (species) {
      case "Cat":
        petIcon = "cat";
        speciesColor = "#ffb347";
        break;
      case "Dog":
        petIcon = "dog";
        speciesColor = "#0080ff";
        break;
      case "Bird":
        petIcon = "dove";
        speciesColor = "#c93335";
        break;
      case "Horse":
        petIcon = "horse";
        speciesColor = "#0dbf0d";
        break;
      case "Fish":
        petIcon = "fish";
        speciesColor = "#71b6f7";
        break;
      case "Exotic":
        petIcon = "spider";
        speciesColor = "#9379c2";
        break;
      default:
        petIcon = "question";
        speciesColor = "black";
        break;
    }

    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        onPress={this.goToPetDetailView}
      >
        <View
          style={{
            paddingBottom: 15,
            paddingTop: 15,
            flex: 1,
            width,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: 'white'
          }}
        >
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 5,
                borderWidth: 2,
                borderColor: speciesColor,
                backgroundColor: speciesColor,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  padding: 1,
                  textAlign: 'center',
                  fontWeight: '600',
                  color: '#fff',
                  fontSize: 14
                }}
              >
                {species}
              </Text>
            </View>
            {pic == "null" && (
              <View
                style={{
                  height: 50,
                  width: 50,
                  margin: 8,
                  borderRadius: 25,
                  paddingRight: 5,
                }}>
                <FontAwesome5 name={petIcon} size={40} color={speciesColor} />
              </View>
            )}
            {pic != "null" && (
              <View
              style={{
                paddingRight: 5,
              }}>
              <Image
                source={{ uri: pic }}
                style={{
                  borderRadius: 85,
                  height: 70,
                  marginBottom: 15,
                  width: 70,
                }}
              />
              </View>
            )}
          </View>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 210
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 36,
                  color: speciesColor
                }}
              >
                {name}
              </Text>
              <FontAwesome5 name={sex=="female" ? "venus" : "mars"} size={30} color={sex=="female" ? "#e75480" : "#009dff"} />
            </View>
            {breed && (
              <Text
                style={{
                  height: 35,
                  fontSize: 20,
                  fontWeight: '300',
                  color: speciesColor
                }}
              >
                {' '}
                {breed}
              </Text>
            )}
          </View>
          <View>
          {age && (
              <Text
                style={sex=="female" ? {
                  height: 60,
                  fontSize: 20,
                  fontWeight: '300',
                  color: "#e75480",
                  paddingTop: 8,
                  paddingLeft: 3,
                }:
                {
                  height: 60,
                  fontSize: 20,
                  fontWeight: '300',
                  color: "#009dff",
                  paddingTop: 8,
                  paddingLeft: 3,
                }}
              >
                {age}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
ListItem.propTypes = {
  // Selected:PropTypes.bool,
  seen: PropTypes.bool,
  name: PropTypes.string,
  pic: PropTypes.string,
  species: PropTypes.string,
  createspeciesColor: PropTypes.bool
};
ListItem.DefaultProps = {
  /*
   * Name:PropTypes.string,
   * pic:PropTypes.string,
   * species:"",
   */
  selected: false,
  createspeciesColor: true
};