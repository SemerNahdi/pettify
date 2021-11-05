PropTypes;
import autobind from "autobind-decorator";
import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

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
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  email: {
    fontWeight: '400',
    fontSize: 18,
    color: 'black',
    flexDirection: 'row',
    width: width - 100
  },
  name: {
    fontWeight: '600',
    fontSize: 26,
    color: 'black',
    flexDirection: 'row',
    width: width - 100
  },
  column: {
    justifyContent: 'center',
    flexDirection: 'column'
  },
  picture: {
    borderRadius: 45,
    height: 70,
    marginBottom: 5,
    marginTop: 5,
    width: 70,
  },
  imageContainer: {
    paddingRight: 8,
    paddingLeft: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  patientItemContainer: {
    paddingBottom: 15,
    paddingTop: 15,
    flex: 1,
    width: width,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'white'
  }
})