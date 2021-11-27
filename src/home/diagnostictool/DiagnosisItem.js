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
      <ImageBackground source={require('../../../assets/pattern.png')} style={styles.container}>
      <TouchableOpacity
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        onPress={this.goToDiagnosisDetailView}
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
              justifyContent: 'center'
            }}
          >
            {pic == null && (
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
            )}
            {pic != null && (
              <Image
                source={{ uri: pic }}
                resizeMode="contain"
                style={{
                  height: 50,
                  width: 50,
                  margin: 8,
                  borderRadius: 15,
                }}
              />
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
                  fontSize: 32,
                  color: diagnosisColor
                }}
              >
                {name}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      </ImageBackground>
    );
  }
}