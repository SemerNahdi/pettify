import React, { Component } from 'react';
import {StyleSheet, View, FlatList, SafeAreaView, Dimensions} from 'react-native';
import PetItem from './PetItem';
import _ from 'lodash';
import Firebase from "../../components/Firebase";
import { NavHeaderWithButton, Theme, RefreshIndicator } from "../../components";
import autobind from 'autobind-decorator';

var height = Dimensions.get('window').height;

export default class Pets extends Component {
  @autobind
  buttonFn() {
    navigation.navigate("AddPets", { uid, onGoBack:() => this.retrieveFireStorePets() });
  }

  constructor(props){
     super(props);
      this.state = {
        items: [],
        loading: true,
      };

      navigation = this.props.navigation;
      uid = navigation.state.params ? navigation.state.params.uid : Firebase.auth.currentUser.uid;
      vet = navigation.state.params ? true : false;
      this.retrieveFireStorePets()
  }

  retrieveFireStorePets = () => {
    let currentUsersPets = []

    Firebase.firestore
    .collection("users")
    .doc(uid)
    .collection("pets")
    .get()
    .then(docs => {
        var i = 0;
        docs.forEach(doc => {
            currentUsersPets.push(doc.data());
            currentUsersPets[i].id = i;
            currentUsersPets[i++].pet_uid = doc.id;
        })

        var n = currentUsersPets.length;
        for (var k = 0; k < n-1; k++)
          for (var l = 0; l < n-k-1; l++)
            if (currentUsersPets[l].name > currentUsersPets[l+1].name)
            {
                // swap currentUsersPets[l+1] and currentUsersPets[l]
                var temp = currentUsersPets[l];
                currentUsersPets[l] = currentUsersPets[l+1];
                currentUsersPets[l+1] = temp;
            }

        this.setState({items:currentUsersPets, loading:false})
    })
  }

    //create each list item
  _renderItem = ({item}) => {
    return (<PetItem 
        index={item.id}
        pet_uid={item.pet_uid}
        uid={uid}
        name={item.name}
        pic={item.pic}
        breed={item.breed}
        species={item.species}
        age={item.age}
        yearsOwned={item.yearsOwned} 
        sex={item.sex}
        activity={item.activity}
        size={item.size}
        spayNeuter_Status={item.spayNeuter_Status}
        weight={item.weight} 
        pregnancy={item.pregnancy}
        lactating={item.lactating}
        classification={item.classification} 
        onGoBack={this.retrieveFireStorePets}
        {...{navigation}}
      />)
    };
    // pressed an item
    onPressItem = (item) => this.printStuffToConsole()

  // map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id.toString();

  render() {
    if(this.state.loading)
    {
      return(
        <SafeAreaView style={[styles.container]}>
          <View style={{
            paddingTop: height/2,
            justifyContent:"center",
          }}>
            <RefreshIndicator refreshing />
          </View>
        </SafeAreaView>
      )
    }
    return (
      <View style={[styles.container]}>
      <NavHeaderWithButton title="Pets" buttonIcon="plus" buttonFn={this.buttonFn} back={vet} backFn={() => this.props.navigation.goBack()} {...{ navigation }}/>
          <FlatList
            data={this.state.items}
            ref={r=>this.refs=r}//create refrence point to enable scrolling
            keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
            renderItem={this._renderItem}//render each item
          />
        </View>
      )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});