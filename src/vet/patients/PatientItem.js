PropTypes;
import autobind from "autobind-decorator";
import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';
import {Theme, } from "../../components";
const { width, height } = Dimensions.get('window');
export default class ListItem extends Component {

  @autobind
  goToPets() {
    const uid = this.props.uid
    this.props.navigation.navigate("Pets", { uid });
  }

  render() {
    const { name, email, pic, id } = this.props; 

    return (
      <TouchableOpacity onPress={this.goToPets}>
        <View style={styles.patientItemContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: pic }} style={styles.picture}/>
          </View> 
          <View style={styles.column}>
            <Text style={styles.name}>
              {name}
            </Text>
            <Text style={styles.email}>
              {email}           
            </Text>   
          </View>
          <View style={styles.icon}>
          <FontAwesome5 name="chevron-right" size={20} />       
          </View>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  email: {
    paddingHorizontal: 10,
    fontWeight: '600',
    fontSize: 15,
    color: Theme.palette.lightblue,
    flexDirection: 'row',
    width: width-100, 
  },
  icon: {
    right:80,
    padding: 20,
  },
  name: {
    paddingHorizontal: 10,
    paddingBottom:2,
    fontWeight: '600',
    fontSize: 18,
    color: Theme.palette.darkblue,
    flexDirection: 'row',
    width: width-100, 
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
  patientItemContainer: {
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