import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator, Dimensions} from 'react-native';
import DiagnosisItem from './DiagnosisItem';
import _ from 'lodash';
import Pagination from 'react-native-pagination';
import Firebase from "../../components/Firebase";
import { NavHeader, Text } from "../../components";
import { LinearGradient } from "expo-linear-gradient";

export default class DiagnosticToolResults extends Component {

  constructor(props){
     super(props);
      this.state = {
        items: [],
        loading: true,
      };
    }

    componentDidMount(){
        const { uid } = Firebase.auth.currentUser;
        let diagnosedDiseases;

        setTimeout(() => {
            Firebase.firestore
            .collection("users")
            .doc(uid)
            .get()
            .then(docRef => {
                diagnosedDiseases = docRef.data()[Object.keys(docRef.data())[0]];
                diagnosedDiseases = diagnosedDiseases.map((str, index) => ({ name: str, id: index + 1}));
                this.setState({items: diagnosedDiseases})
            })
            .then(() => {
                this.setState({ loading: false });
            })
            .catch((error) => { console.log('Error retrieving doc: ', error) })
        }, 1000);
    }

    //create each list item
  _renderItem = ({item}) => {
    const { navigation } = this.props;
    return (<DiagnosisItem index={item.id}
        name={item.name}
        {...{navigation}}
      />)
    };

  //map to some id. We use the "id" attribute of each item in our list created in our MockPersonList
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
      <NavHeader title="Diagnosed Diseases" back {...{ navigation }} />
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
            dotIconHide
            dotEmptyHide
          />
          {(this.state.items).length < 1 && <Text style={styles.noItemsMessage}>No diseases found. Please contact your veterinarian.</Text>}
        </View>
      )
  }
};

const {height} = Dimensions.get("window");

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
    bottom: 0,
    zIndex: 0
  },
  noItemsMessage: {
    zIndex: 1000,
    bottom: height/2,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 21
  }
});

AppRegistry.registerComponent('ReactNativePaginationExample', () => App);