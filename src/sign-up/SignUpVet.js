import autobind from "autobind-decorator";
import * as React from "react";
import {TextField, Firebase, Button} from "../components";
import {View, StyleSheet, Dimensions} from "react-native";
import {Theme, NavHeader} from "../components/Theme";
import * as firebase from "firebase";
import { Title } from "native-base";
import Text from "../components/Text";

export default class SignUpVet extends React.Component {

    //does loading reset every time the page is opened??
    state = {
        email: "",
        loading: false,
    };

    @autobind
    setEmail(email: string) {
        this.setState({ email });
    }

    @autobind
    back() {
        this.props.navigation.goBack();
    }
    
    @autobind
    async next(): Promise<void> {
        
        const { email } = this.state;

        try { 
            if (email === "") {
                throw new Error("Please provide an email address.");
            }

            this.setState({ loading: true });

            //config loading correctly from Firebase.js??
            var vetCreation = firebase.initializeApp(Firebase.config, "VET");
            var vetUid;
    
            await vetCreation.auth().createUserWithEmailAndPassword(email, "default123").then(
                (vet) => { vetUid = vet.user.uid; }
            );

            //does this work??
            vetCreation.auth().sendPasswordResetEmail(email);

            await vetCreation.firestore().collection("users").doc(vetUid).set({
                name: "Vet",
                email: email,
                role: "v",
                pic: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/fiber%2Fprofile%2FJ0k2SZiI9V9KoYZK7Enru5e8CbqFxdzjkHCmzd2yZ1dyR22Vcjc0PXDPslhgH1JSEOKMMOnDcubGv8s4ZxA.jpg?alt=media&token=6d5a2309-cf94-4b8e-a405-65f8c5c6c87c",
                picture: {
                    // eslint-disable-next-line max-len
                    uri: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/fiber%2Fprofile%2FJ0k2SZiI9V9KoYZK7Enru5e8CbqFxdzjkHCmzd2yZ1dyR22Vcjc0PXDPslhgH1JSEOKMMOnDcubGv8s4ZxA.jpg?alt=media&token=6d5a2309-cf94-4b8e-a405-65f8c5c6c87c",
                    preview: "data:image/gif;base64,R0lGODlhAQABAPAAAKyhmP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                }
            });
    
            await vetCreation.auth().signOut();
            await vetCreation.delete();

            //choice of multiple vet creation or force back to Patient screen
            //set loading false
            //clear out text field

            //does this need to be awaited for some reason???
            this.back();

            //do we want admin to be able to create multiple vets in one go or should it send him back to Patient Screen
        } catch (e) {
            alert(e);
            this.setState({ loading: false });
            await vetCreation.auth().signOut();
            await vetCreation.delete();
        }
        
    }

    render(): React.Node {
        const {loading} = this.state;

        return (
            
            <View style={styles.container}>
            <View style={styles.firstrow}>
                <Text type="header2" >{"Vet Sign Up"}</Text>        
            </View>
            <View style={styles.secondrow}>
                <TextField
                    placeholder="Enter Vet's Email"
                    placeholderTextColor={"black"}
                    keyboardType="email-address"
                    contrast
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    onChangeText={this.setEmail}
                />   
            </View>
            <View style={styles.thirdrow}>
                 <Button label="Create New Vet" full onPress={this.next} {...{ loading } } style="primary"/> 

            </View>
            <View style={styles.fourthrow}>
                <Button label="Back" full onPress={this.back} style="base" />
                    
            </View>
            
         
                   
                    
                    </View>
                
        );
    }
}

//CSS most likely needs to be worked on
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
        
    container: {
        height: height - (Theme.spacing.base ),
        justifyContent: "center",
        backgroundColor: "#F0F6F7FF",
        flex: 1,
       
    
    },
    firstrow: {
        alignSelf: "center",
        justifyContent: "space-between",
        justifyContent: "flex-start",
        flex: .3,
        paddingVertical:60,
        
    },
    secondrow: {
        margin:10,
        
        //alignSelf: "center",
        paddingHorizontal:3,
        //flex: .25,
        justifyContent: "center",
        
        },
    thirdrow: {
        marginTop:.01,
        margin:10,
        //alignSelf: "center",
        
        //flex: .1,
        //paddingVertical:10,
        justifyContent: "center",
        justifyContent: "space-between",
        },
    fourthrow: {
        
        flex: .50,
       // paddingVertical:1,
        justifyContent: "center",
        justifyContent: "space-between",
        
        }


});