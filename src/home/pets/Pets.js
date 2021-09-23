import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import PetItem from './PetItem';
import _ from 'lodash';
import Pagination,{Icon,Dot} from 'react-native-pagination';//{Icon,Dot} also available
import Firebase from "../../components/Firebase";
import { NavHeaderWithButton, Theme } from "../../components";
import { LinearGradient } from "expo-linear-gradient";
import autobind from 'autobind-decorator';

export default class Pets extends Component {
  @autobind
  buttonFn() {
    this.props.navigation.navigate("AddPets", { onSelect: this.onSelect, getData: () => this.retrieveFireStorePets() });
  }

  constructor(props){
     super(props);
      this.state = {
        items: [],
        loading: true,
      };

      uid  = Firebase.auth.currentUser;

      Firebase.firestore
        .collection("users")
        .doc(uid)
        .collection("pets")
        .onSnapshot(docs => {
          this.retrieveFireStorePets()
        });
    }

    componentWillUnmount() {
      if(this.willFocusSubscription != null)
      {
        this.willFocusSubscription.remove();
      }
    }

  retrieveFireStorePets() {
    let currentUsersPets = []

    Firebase.firestore
    .collection("users")
    .doc(uid)
    .collection("pets")
    .get()
    .then(docs => {
        var i = 0;
        docs.forEach(doc => {
          console.log(doc.data());
            currentUsersPets.push(doc.data());
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

        var j = 0;
        currentUsersPets.forEach(pet => {
            pet.id = j++;
        })
        this.setState({items:currentUsersPets, loading:false})
    })
  }

    //create each list item
  _renderItem = ({item}) => {
    const { navigation } = this.props;
    const { retrieveFireStorePets } = this;
    return (<PetItem index={item.id}
        pet_uid={item.pet_uid}
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
        {...{navigation}}
      />)
    };
    // pressed an item
    onPressItem = (item) => this.printStuffToConsole()

  // map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id.toString();

  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) =>this.setState({viewableItems})

  render() {
    const { buttonFn } = this;
    const { navigation } = this.props;

    if(this.state.loading)
    {
        return(
        <SafeAreaView style={[styles.container]}>
        <View style={{
            paddingTop: "40%",
            justifyContent:"center",
        }}>
            <ActivityIndicator size="large" />
        </View>
        </SafeAreaView>
        )
    }
    return (
      <View style={[styles.container]}>
      <NavHeaderWithButton title="My Pets" buttonFn={this.buttonFn} buttonIcon="plus" />
        <LinearGradient colors={["#81f1f7", "#9dffb0"]} style={styles.gradient} />
          <FlatList
            data={this.state.items}
            ref={r=>this.refs=r}//create refrence point to enable scrolling
            keyExtractor={this._keyExtractor}//map your keys to whatever unique ids the have (mine is a "id" prop)
            renderItem={this._renderItem}//render each item
            onViewableItemsChanged={this.onViewableItemsChanged}//need this
          />
          <Pagination
            // remove this to get rid of dots next to list
            // dotThemeLight //<--use with backgroundColor:"grey"
            listRef={this.refs}//to allow React Native Pagination to scroll to item when clicked  (so add "ref={r=>this.refs=r}" to your list)
            paginationVisibleItems={this.state.viewableItems}//needs to track what the user sees
            paginationItems={this.state.items}//pass the same list as data
            paginationItemPadSize={3} //num of items to pad above and below your visable items
            dotTextHide
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
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
});

AppRegistry.registerComponent('ReactNativePaginationExample', () => App);