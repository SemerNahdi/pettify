import React, { Component } from 'react';
import {StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import PetItem from '../../home/pets/PetItem';
import PatientItem from './PatientItem'
import _ from 'lodash';
import Pagination from 'react-native-pagination';//{Icon,Dot} also available
import Firebase from "../../components/Firebase";
import { NavHeader, Theme } from "../../components";
import { LinearGradient } from "expo-linear-gradient";

export default class Pets extends Component {

  constructor(props){
     super(props);
      this.state = {
        items: [],
        loading: true,
      };
    }

    componentWillMount(){
        this.retrieveFireStorePets();
    }

    componentWillUnmount() {
      if(this.willFocusSubscription != null)
      {
        this.willFocusSubscription.remove();
      }
    }

  retrieveFireStorePets() {
    let allUsers = []

    Firebase.firestore
    .collection("users")
    //.where("role", "==", "p")
    .get()
    .then(docs => {
        var i = 0;
        docs.forEach(doc => {
            allUsers.push(doc.data());
            allUsers[i].id = i;
            allUsers[i++].uid = doc.id;
        })

        console.log(allUsers);

        ///this is sort alphabetically
        var n = allUsers.length;
        for (var k = 0; k < n-1; k++)
          for (var l = 0; l < n-k-1; l++)
            if (allUsers[l].name > allUsers[l+1].name)
            {
                var temp = allUsers[l];
                allUsers[l] = allUsers[l+1];
                allUsers[l+1] = temp;
            }
        
        this.setState({items:allUsers, loading:false})
    })
  }

    //create each list item
  _renderItem = ({item}) => {
    const { navigation } = this.props;
    return (<PatientItem 
        index={item.id}
        uid={item.uid}
        name={item.name}
        pic={item.picture.uri}
        email={item.email}
        {...{navigation}}
      />)
    };

  // map to some od. We use the "id" attribute of each item in our list created in our MockPersonList
  _keyExtractor = (item, index) => item.id.toString();

  // REQUIRED for ReactNativePagination to work correctly
  onViewableItemsChanged = ({ viewableItems, changed }) =>this.setState({viewableItems})

  render() {
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
      <NavHeader title="Patients" />
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
            paginationItemPadSize={0} //num of items to pad above and below your visable items
            dotTextHide
            dotIconHide
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