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
  goToPets() {
    console.log("from pait", this.props.uid)
    const userUId = this.props.uid
    this.props.navigation.navigate("Pets", { userUId });
  }

  render() {
    const { name, email, pic, id } = this.props; 

    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        onPress={this.goToPets}
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
              paddingRight: 5,
              alignSelf: 'center',
              justifyContent: 'center',
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
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <Text
              style={{
                fontWeight: '600',
                fontSize: 32,
                color: 'black',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 210
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 20,
                color: 'black',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 210
              }}
            >
              {email}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}