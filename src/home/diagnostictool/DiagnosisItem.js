import autobind from "autobind-decorator";
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import { FontAwesome5 } from '@expo/vector-icons';
import { Theme } from "../../components";
const { width, height } = Dimensions.get('window');

export default class ListItem extends Component {
    
  @autobind
  goToDiagnosisDetailView() {
    const diagnosisName = this.props.name;
    this.props.navigation.navigate("DiagnosisDetailView", { diagnosisName });
  }

  render() {
    const { name, pic } = this.props;
    let diagnosisIcon = "clipboard-check";
    let diagnosisColor = Theme.palette.black;

    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15
          }
        ]}
        onPress={this.goToDiagnosisDetailView}
      >
        <View
          style={{
            paddingBottom: 15,
            paddingTop: 15,
            flex: 1,
            width: width - 50,
            flexDirection: 'row',
            backgroundColor: "white",
            borderRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: .2,
            shadowRadius: .5,
            alignItems: "center"
          }}
        >
          <View
            resizeMode="contain"
            style={{
              height: 50,
              width: 50,
              margin: 8,
              borderRadius: 25,
            }}>
            <FontAwesome5 name={diagnosisIcon} size={40} color={diagnosisColor} />
          </View>

          <Text
            style={{
              fontWeight: '600',
              fontSize: 32,
              color: diagnosisColor
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}