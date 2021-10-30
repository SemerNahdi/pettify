import autobind from "autobind-decorator";
import * as React from "react";
import {TextField, Firebase, Button} from "../components";
import {View, StyleSheet, Dimensions} from "react-native";
import {Theme} from "../components/Theme";

export default class Password extends React.Component {

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
                pic: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/fiber%2Fprofile%2FJ0k2SZiI9V9KoYZK7Enru5e8CbqFxdzjkHCmzd2yZ1dyR22Vcjc0PXDPslhgH1JSEOKMMOnDcubGv8s4ZxA.jpg?alt=media&token=6d5a2309-cf94-4b8e-a405-65f8c5c6c87c"
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
        }
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {loading} = this.state;

        return (
                <View style={styles.innerContainer}>
                    
                    <TextField
                        placeholder="Email"
                        keyboardType="email-address"
                        contrast
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="go"
                        onChangeText={this.setEmail}
                    />

                    <Button label="Create Vet" full onPress={this.next} {...{ loading } } style="primary"/> 

                    <Button label="Back" full onPress={this.back} style="base" />
                    
                </View>
        );
    }
}

//CSS most likely needs to be worked on
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    textInput: {
        borderColor: Theme.palette.borderColor,
        borderWidth: 1,
        borderRadius: 3,
        ...Theme.typography.regular,
        color: Theme.typography.color,
        padding: Theme.spacing.small,
        marginBottom: Theme.spacing.base,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 1,
        width: "85%"
    },
    container: {
        flexDirection: 'row',
        height: Theme.spacing.base * 1.2,
        justifyContent: 'center',
    },
    content: {
        padding: Theme.spacing.base,
    },
    innerContainer: {
        height: height - (Theme.spacing.base * 3),
        justifyContent: "center",
    }
});