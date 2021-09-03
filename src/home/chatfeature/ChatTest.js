import React, { Component } from 'react';
import { 
  View, StyleSheet, ScrollView, Dimensions, SectionList, TouchableOpacity, TextInput, SafeAreaView,
  KeyboardAvoidingView  
} from 'react-native';
import { Theme, NavHeaderWithButton, Text } from "../../components";
import type { ScreenParams } from "../../components/Types";
import { LinearGradient } from "expo-linear-gradient";
import Firebase from "../../components/Firebase";

export default class ChatTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      chat: "",
    };

    const { uid } = Firebase.auth.currentUser;
    const { navigation } = this.props;
    const params = navigation.state.params;

    Firebase.firestore
      .collection("users")
      .doc(uid)
      .get()
      .then(docs => {
        this.setState({
          role: docs.data().role,
        });
      });
    }

    setChat = (chat) => {
      this.setState({chat: chat});
    }

  render() {
    const { navigation } = this.props;
    const { items, selectedItem } = this.state;

    return (
      <View style={styles.container}>
        <NavHeaderWithButton title="Chat Assistant" />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
        <KeyboardAvoidingView style ={{flex:1}} behavior='padding'>

          {this.state.role == 'v' && <View style={styles.chatAssistantContainer}>

            <View style ={styles.chatAssistant}>
              <Text style = {styles.chatTextColor}> [ChatAssistant]: </Text>
              <Text style = {styles.chatTextColor}> What would you like to say to the Pet Owner? </Text>
            </View>

            <View style ={styles.sampleText}>
              <Text style = {styles.chatTextColor}> [You]: </Text>
              <Text style = {styles.chatTextColor}> I have updated your pet's prescription. </Text>
            </View>

            <TextInput style={styles.bigInput}
              returnKeyType = 'default'
              blurOnSubmit = {true}
              placeholder="Type a message..."
              autoCapitalize = 'sentences'
              autoCorrect = {true}
              onChangeText={text => this.setChat(text)}
              multiline={true}
              value={this.state.chat}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={null}>
              <Text style = {styles.chatTextColor}>Send message</Text>
            </TouchableOpacity>

          </View>}

          {this.state.role == 'p' && <View style={styles.chatAssistantContainer}>

            <View style ={styles.chatAssistant}>
              <Text style = {styles.chatTextColor}> [ChatAssistant]: </Text>
              <Text style = {styles.chatTextColor}> What would you like to say to the Veterinarian? </Text>
            </View>

            <View style ={styles.sampleText}>
              <Text style = {styles.chatTextColor}> [You]: </Text>
              <Text style = {styles.chatTextColor}> Should I change my pet's diet? </Text>
            </View>

            <TextInput style={styles.bigInput}
              returnKeyType = 'default'
              blurOnSubmit = {true}
              placeholder="Type a message..."
              autoCapitalize = 'sentences'
              autoCorrect = {true}
              onChangeText={text => this.setChat(text)}
              multiline={true}
              value={this.state.chat}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={this.saveMessage}>
              <Text style = {styles.chatTextColor}>Send message</Text>
            </TouchableOpacity>

          </View>}

        </KeyboardAvoidingView>
      </View>
    )
  }
}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f0f0f0'
  },
  chatTextColor:{
    color: '#fff'
  },
  submitButton:{
    borderColor: '#1982FC',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#1982FC',
    alignSelf: 'center',
    padding: 10,
    bottom: 8,
    position: 'absolute'
  },
  chatAssistantContainer:{
    paddingBottom: 35,
    flex: 1,
  },
  chatAssistant:{
    borderColor: '#8e8e93',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#8e8e93',
    margin: 10,
    height: 80,
    alignSelf: 'flex-start'
  },
  sampleText:{
    borderColor: '#53d769',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#53d769',
    margin: 10,
    height: 80,
    alignSelf: 'flex-end'
  },
  bigInput: {
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FAFAFA',
    margin: 12,
    height: 80,
    width: 390,
    position: 'absolute', 
    bottom: 50, 
  },
});