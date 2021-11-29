import autobind from "autobind-decorator";
import * as React from "react";
import {TextField, Firebase, Button} from "../components";
import {View, StyleSheet, Dimensions} from "react-native";
import {Theme, NavHeader} from "../components/Theme";
import * as firebase from "firebase";
import Text from "../components/Text";
import { ThemeColors } from "react-navigation";

export default class SignUpVet extends React.Component {
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
            var vetCreation = firebase.initializeApp(Firebase.config, "VET");
            var vetUid;
            await vetCreation.auth().createUserWithEmailAndPassword(email, "default123").then(
                (vet) => { vetUid = vet.user.uid; }
            );
            vetCreation.auth().sendPasswordResetEmail(email);
            await vetCreation.firestore().collection("users").doc(vetUid).set({
                name: "Vet",
                email: email,
                role: "v",
                pic: Theme.links.defaultProfile,
            });
            await vetCreation.auth().signOut();
            await vetCreation.delete();
            this.back();  } catch (e) {
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
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({  
    container: {
        height: height - (Theme.spacing.base ),
        justifyContent: "center",
        backgroundColor: Theme.palette.backgroundColor,
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
        paddingHorizontal:3,
        justifyContent: "center",
        },
    thirdrow: {
        marginTop:.01,
        margin:10,
        justifyContent: "center",
        justifyContent: "space-between",
        },
    fourthrow: {  
        flex: .50,
        justifyContent: "center",
        justifyContent: "space-between",
        }
});