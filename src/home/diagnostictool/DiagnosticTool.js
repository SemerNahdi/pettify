// @flow
import * as React from "react";
import { StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from '@expo/vector-icons';

import {Theme, Button, NavHeader} from "../../components";
import MultiSelectDropdown from "./MultiSelectDropdown";

type DropdownIsVisibleState = { dropdownIsVisible: boolean };

export default class DiagnosticTool extends React.Component<DropdownIsVisibleState> {
  constructor(props) {
    super(props);
    this.state = {
      dropdownIsVisible: false,
      dogStyle: "defaultButton",
      catStyle: "defaultButton",
      birdStyle: "defaultButton"
    };
  }

  hideDropdown() {
    this.setState({ dropdownIsVisible: false });
  }

  showDropdown() {
    this.setState({ dropdownIsVisible: true });
  }

  selectSpecies = ( species ) => {
    if (this._multiselectdropdown === undefined) 
    {
      this.hideDropdown();
      this._multiselectdropdown.selectPet("Dog");
    } 
    else 
    {
      this._multiselectdropdown.selectPet(species);

      if(species === "Dog")
      {
        this.setState({ catStyle: "defaultButton" })
        this.setState({ birdStyle: "defaultButton" })
        this.setState({ dogStyle: "highlight" })
      }
      else if(species === "Cat")
      {
        this.setState({ catStyle: "highlight" })
        this.setState({ birdStyle: "defaultButton" })
        this.setState({ dogStyle: "defaultButton" })
      }
      else if(species === "Bird")
      {
        this.setState({ catStyle: "defaultButton" })
        this.setState({ birdStyle: "highlight" })
        this.setState({ dogStyle: "defaultButton" })
      }
    }
  }

  render(): React.Node {
    const { navigation } = this.props;
    
    return (
      <View style={styles.container}>
        <NavHeader title="Diagnostic Tool" {...{ navigation }} />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
        <ScrollView contentContainerStyle={styles.scroll} persistentScrollbar={false} >
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dog" size={Theme.typography.header1.fontSize} style={styles.image} />
            <Button
              label = "Dog"
              onPress={() => this.selectSpecies("Dog")}
              full
              style={this.state.dogStyle}
            />
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="cat" size={Theme.typography.header1.fontSize} style={styles.image} />
            <Button
              label = "Cat"
              onPress={() => this.selectSpecies("Cat")}
              full
              style={this.state.catStyle}
            />
            </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dove" size={Theme.typography.header1.fontSize} style={styles.image} />
            <Button
              label = "Bird"
              onPress={() => this.selectSpecies("Bird")}
              full
              style={this.state.birdStyle}
            />
          </View>
        </View>
        <View style={styles.multiSelectContainer}>
          <MultiSelectDropdown navigation={this.props.navigation} ref={ref => (this._multiselectdropdown = ref)} />
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  message: {
    color: Theme.palette.black,
    fontSize: 20,
    fontFamily: Theme.typography.semibold,
    textAlign: "center",
    marginBottom: Theme.spacing.base
  },
  buttonContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginVertical: Theme.spacing.base
  },
  image: {
    padding: 10,
    color: Theme.palette.white
  },
  iconContainer: {
    justifyContent: "center",
    flexDirection: "column",
    marginHorizontal: Theme.spacing.base
  },
  multiSelectContainer: {
    padding: 10,
    alignSelf: "stretch",
  }
});
