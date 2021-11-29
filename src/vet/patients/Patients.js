import React, { Component } from 'react';
import {StyleSheet, View, FlatList, SafeAreaView, Dimensions, ImageBackground} from 'react-native';
import PatientItem from './PatientItem'
import _ from 'lodash';
import Firebase from "../../components/Firebase";
import { NavHeaderWithButton, Theme, NavHeader, RefreshIndicator } from "../../components";
import autobind from 'autobind-decorator';

var height = Dimensions.get('window').height;

export default class Patients extends Component {

  @autobind
  buttonFn() {
    navigation.navigate("SignUpVet");
  }

  constructor(props){
      super(props);
      this.state = {
        role: "",
        items: [],
        loading: true,
      };
      navigation = this.props.navigation;
      const { uid } = Firebase.auth.currentUser;
      Firebase.firestore.collection("users").doc(uid).get().then(
        (doc)=>{
          data=doc.data()
          this.setState({role: data.role})
        }
      )
      this.retrieveFireStorePatients();
    }

  retrieveFireStorePatients() {
    let allUsers = []

    Firebase.firestore
    .collection("users")
    .where("role", "==", "p")
    .get()
    .then(docs => {

        var i = 0;
        docs.forEach(doc => {
            allUsers.push(doc.data());
            allUsers[i].id = i;
            allUsers[i++].uid = doc.id;
        })

        ///this is sort alphabetically
        var n = allUsers.length;
        for (var k = 0; k < n-1; k++)
        {
          for (var l = 0; l < n-k-1; l++)
          {
            if (allUsers[l].name > allUsers[l+1].name)
            {
                var temp = allUsers[l];
                allUsers[l] = allUsers[l+1];
                allUsers[l+1] = temp;
            }
          }
        }
        
        this.setState({items:allUsers, loading:false})
    })
  }

    //create each list item
  _renderItem = ({item}) => {
    return (<PatientItem 
        index={item.id}
        uid={item.uid}
        name={item.name}
        pic={item.pic}
        email={item.email}
        {...{navigation}}
      />)
    };

  // map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id.toString();
  
  render() {
    if(this.state.loading)
    {
      return(
        <SafeAreaView style={styles.container}>
          <View style={{
            paddingTop: height/2,
            justifyContent:"center",
          }}>
            <RefreshIndicator refreshing />
          </View>
        </SafeAreaView>
      )
    }       
    else if(this.state.role == "a")
    {
      return (
        <ImageBackground source={require('../../../assets/pattern.png')} style={styles.container}>
        <NavHeaderWithButton title="Users" buttonFn={this.buttonFn} buttonIcon="plus" />
            <FlatList
              data={this.state.items}
              ref={r=>this.refs=r}//create refrence point to enable scrolling
              keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
              renderItem={this._renderItem}//render each item
            />
          </ImageBackground>
        )
    }
    else{
      return (
        <ImageBackground source={require('../../../assets/pattern.png')} style={styles.container}>
          <NavHeader title="Users"{...{ navigation }}/>
            <FlatList
              data={this.state.items}
              ref={r=>this.refs=r}//create refrence point to enable scrolling
              keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
              renderItem={this._renderItem}//render each item
            />
          </ImageBackground>
      )
    } 
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});