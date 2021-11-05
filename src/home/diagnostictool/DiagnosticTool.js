// @flow
import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import {Theme, Button, NavHeader} from "../../components";
import MultiSelectDropdown from "./MultiSelectDropdown";

type DropdownIsVisibleState = { dropdownIsVisible: boolean };

export class SelectPetButton extends React.Component {
  selectPet(dropdown, species) {
    if (dropdown == undefined) {
      dropdown.selectPet("Dog");
    } else {
      dropdown.selectPet(species);
    }
  }

  render() {
    return (
      <Button
        label={this.props.label}
        onPress={(event) => this.props.onPress(event, this.props.label, this.selectPet)}
        full
        style="primary"
      />
    );
  }
}

export default class DiagnosticTool extends React.Component<DropdownIsVisibleState> {
  constructor(props) {
    super(props);
    this.state = {dropdownIsVisible: false};
  }

  hideDropdown() {
    this.setState({ dropdownIsVisible: false });
  }

  showDropdown() {
    this.setState({ dropdownIsVisible: true });
  }

  selectSpecies = (event, species, onPressSpeciesButtonCallback) => {
    if (this._multiselectdropdown === undefined) {
      this.hideDropdown();
      onPressSpeciesButtonCallback(this._multiselectdropdown, "Dog");
    } else {
      onPressSpeciesButtonCallback(this._multiselectdropdown, species);
    }
  }

  render(): React.Node {
    const { navigation } = this.props;
    
    return (
      <View style={styles.container}>
        <NavHeader title="Diagnostic Tool" {...{ navigation }} />
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dog" size={Theme.typography.header1.fontSize} style={styles.image} />
            <SelectPetButton
              label="Dog"
              onPress={this.selectSpecies}
            />
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="cat" size={Theme.typography.header1.fontSize} style={styles.image} />
            <SelectPetButton
              label="Cat"
              onPress={this.selectSpecies}
            />
            </View>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="dove" size={Theme.typography.header1.fontSize} style={styles.image} />
            <SelectPetButton
              label="Bird"
              onPress={this.selectSpecies}
            />
          </View>
        </View>
        <View style={styles.multiSelectContainer}>
          <MultiSelectDropdown navigation={this.props.navigation} ref={ref => (this._multiselectdropdown = ref)} />
        </View>
      </View>
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
