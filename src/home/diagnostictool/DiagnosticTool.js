// @flow
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from "react-native";
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
      birdStyle: "defaultButton",
      dogImage: styles.petImage,
      catImage: styles.petImage,
      birdImage: styles.petImage

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
        this.setState({ dogImage: styles.petImage2 })
        this.setState({ catImage: styles.petImage })
        this.setState({ birdImage: styles.petImage })
      }
      else if(species === "Cat")
      {
        this.setState({ catStyle: "highlight" })
        this.setState({ birdStyle: "defaultButton" })
        this.setState({ dogStyle: "defaultButton" })
        this.setState({ dogImage: styles.petImage })
        this.setState({ catImage: styles.petImage2 })
        this.setState({ birdImage: styles.petImage })
      }
      else if(species === "Bird")
      {
        this.setState({ catStyle: "defaultButton" })
        this.setState({ birdStyle: "highlight" })
        this.setState({ dogStyle: "defaultButton" })
        this.setState({ dogImage: styles.petImage })
        this.setState({ catImage: styles.petImage })
        this.setState({ birdImage: styles.petImage2 })
      }
    }
  }

  render(): React.Node {
    const { navigation } = this.props;
    
    return (
      <ImageBackground source={require('../../../assets/pattern.png')} style={styles.container}>
        <NavHeader title="Diagnostic Tool" {...{ navigation }} />
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dog" size={Theme.typography.header1.fontSize} style={this.state.dogImage} />
            <Button
              label = "Dog"
              onPress={() => this.selectSpecies("Dog")}
              full
              style={this.state.dogStyle}
            />
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="cat" size={Theme.typography.header1.fontSize} style={this.state.catImage} />
            <Button
              label = "Cat"
              onPress={() => this.selectSpecies("Cat")}
              full
              style={this.state.catStyle}
            />
            </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dove" size={Theme.typography.header1.fontSize} style={this.state.birdImage} />
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
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
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
  petImage: {
    padding: 10,
    color: Theme.palette.darkgray,
  },
  petImage2: {
    padding: 10,
    color: Theme.palette.black
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
