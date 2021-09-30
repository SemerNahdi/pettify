import Firebase from "../../components/Firebase";
import React, { Component } from 'react'
import type { ScreenParams } from "../../components/Types";
import { NavHeader } from "../../components";
import { Card } from 'react-native-elements'
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import {Text, Theme} from "../../components";

export default class PetDetailView extends React.Component<ScreenParams<{ diagnosisNameObject: String }>, SettingsState> {
  constructor(props)
  {
    super(props);
    this.state = {
        description: [],
        symptoms: [],
        stageOne: [],
        stageTwo: [],
        treatments: [],
        prevention: []
    };
  }


  async componentDidMount(): Promise<void> {
    const { navigation } = this.props;
    const diagnosisNameObject  = navigation.state.params;
    let diagnosisName = diagnosisNameObject[Object.keys(diagnosisNameObject)[0]];

    Firebase.firestore
    .collection("diseaseDetails")
    .doc(diagnosisName)
    .get()
    .then(doc => {
        this.setState({
            description: doc.data().description, 
            symptoms: doc.data().symptoms,
            stageOne: doc.data().stageOne,
            stageTwo: doc.data().stageTwo,
            treatments: doc.data().treatments,
            prevention: doc.data().prevention,
        });
    });
  }

  renderDetail = (stateParameter, heading) => {
    return(
      <>
        {stateParameter.length > 0 && <View style={styles.separator} />}
        {stateParameter.length > 0 && <Text style={Theme.typography.header3}>{heading}</Text>}
        {stateParameter.length > 0 && <View style={styles.separator} />}
        {stateParameter.length > 0 && <Text />}
        <FlatList
        style={styles.diagnosisResultsContainer}
        data={stateParameter}
        renderItem={({ item }) => (
          <Text style={styles.diagnosisResultsText}>• { item }</Text>
        )}
        />
        {stateParameter.length > 0 && <Text />}
      </>
    )
}

  render():React.Node {
    const { navigation } = this.props;

    if(this.state.loading)
    {
      return(
        <ScrollView style={[styles.container]}>
          <View style={{
            paddingTop: "40%",
            justifyContent:"center",
          }}>
          <ActivityIndicator size="large" />
          </View>
        </ScrollView>
      )
    }
    else {
    return (
      <>
      <NavHeader title={navigation.state.params[Object.keys(navigation.state.params)[0]]} back {...{ navigation }} />
      <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.gradient} />
      <ScrollView contentContainerStyle={styles.scroll} persistentScrollbar={false} >
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderDetail(this.state.description, "Description")}
            {this.renderDetail(this.state.symptoms, "Symptoms")}
            {this.renderDetail(this.state.stageOne, "Stage One")}
            {this.renderDetail(this.state.stageTwo, "Stage Two")}
            {this.renderDetail(this.state.treatments, "Treatments")}
            {this.renderDetail(this.state.prevention, "Prevention")}
          </Card>
        </View>
      </ScrollView>
      </>
    )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  cardContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: Theme.spacing.base
  },
  diagnosisResultsText: {
    marginHorizontal: Theme.spacing.tiny,
    marginBottom: Theme.spacing.tiny
  },
  separator: {
    borderColor: Theme.palette.black,
    borderWidth: 0.8,
    flex: 8,
    flexDirection: "row"
  },
})

