// @flow
/* eslint-disable no-console, func-names */
import * as React from "react";
import { StatusBar, Platform, LogBox } from "react-native";
import { StyleProvider, View } from "native-base";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AppLoading from "expo-app-loading";
import { Provider, inject } from "mobx-react";
import { Feather } from "@expo/vector-icons";
import * as Font from "expo-font";

import { Images, Firebase, FeedStore } from "./src/components";
import type { ScreenProps } from "./src/components/Types";

import { Welcome } from "./src/welcome";
import { Walkthrough } from "./src/walkthrough";
import { SignUpName, SignUpEmail, Role, SignUpPassword, Login, SignUpRole } from "./src/sign-up";
import {
    Profile,
    HomeTab,
    Settings,
    ProfileStore,
    Pets,
    PetDetailView,
    TrainingScreen,
    AddPets,
    DiagnosticTool,
    DiagnosticToolResults,
    DiagnosisDetailView,
    EditScreen,
    ViewDocuments,
    ChatTest,
    PetPrescription,
    PetDiet,
} from "./src/home";
import {
    VetTab,
    Patients
} from "./src/vet"

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

// $FlowFixMe
const SFProTextMedium = require("./assets/fonts/SF-Pro-Text-Medium.otf");
// $FlowFixMe
const SFProTextHeavy = require("./assets/fonts/SF-Pro-Text-Heavy.otf");
// $FlowFixMe
const SFProTextBold = require("./assets/fonts/SF-Pro-Text-Bold.otf");
// $FlowFixMe
const SFProTextSemibold = require("./assets/fonts/SF-Pro-Text-Semibold.otf");
// $FlowFixMe
const SFProTextRegular = require("./assets/fonts/SF-Pro-Text-Regular.otf");
// $FlowFixMe
const SFProTextLight = require("./assets/fonts/SF-Pro-Text-Light.otf");

// useStrict(true);

const originalSend = XMLHttpRequest.prototype.send;
// https://github.com/firebase/firebase-js-sdk/issues/283
// $FlowFixMe
XMLHttpRequest.prototype.send = function (body: string) {
    if (body === "") {
        originalSend.call(this);
    } else {
        originalSend.call(this, body);
    }
};

// https://github.com/firebase/firebase-js-sdk/issues/97
if (!console.ignoredYellowBox) {
    // $FlowFixMe
    console.ignoredYellowBox = [];
}
// $FlowFixMe
console.ignoredYellowBox.push("Setting a timer");

@inject("profileStore")
class Loading extends React.Component<ScreenProps<>> {
    async componentDidMount(): Promise<void> {
        LogBox.ignoreAllLogs();
        const { navigation, profileStore } = this.props;
        await Loading.loadStaticResources();
        Firebase.init();
        Firebase.auth.onAuthStateChanged((user) => {
            const isUserAuthenticated = !!user;
            if (isUserAuthenticated) {
                const { uid } = Firebase.auth.currentUser;
                profileStore.init();
                var data;
                Firebase.firestore.collection("users").doc(uid).get().then(
                    (doc) =>
                    { 
                        data = doc.data(); 
                        if(data.role == "v")
                        {
                            navigation.navigate("Vet")
                        }
                        else
                        {
                            navigation.navigate("Home")
                        }
                    });
            } else {
                navigation.navigate("Welcome");
            }
        });
    }

    static async loadStaticResources(): Promise<void> {
        try {
            const images = Images.downloadAsync();
            const fonts = Font.loadAsync({
                "SFProText-Medium": SFProTextMedium,
                "SFProText-Heavy": SFProTextHeavy,
                "SFProText-Bold": SFProTextBold,
                "SFProText-Semibold": SFProTextSemibold,
                "SFProText-Regular": SFProTextRegular,
                "SFProText-Light": SFProTextLight,
            });
            const icons = Font.loadAsync(Feather.font);
            await Promise.all([...images, fonts, icons]);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return <AppLoading />;
    }
}

// eslint-disable-next-line react/no-multi-comp
export default class App extends React.Component {
    profileStore = new ProfileStore();
    feedStore = new FeedStore();
    userFeedStore = new FeedStore();

    componentDidMount() {
        StatusBar.setBarStyle("dark-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("white");
        }
    }

    render(): React.Node {
        const { feedStore, profileStore, userFeedStore } = this;
        return (
            <StyleProvider style={getTheme(variables)}>
                <Provider {...{ feedStore, profileStore, userFeedStore }}>
                    <AppNavigator onNavigationStateChange={() => undefined} />
                </Provider>
            </StyleProvider>
        );
    }
}

const StackNavigatorOptions = {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white",
    },
};

const ProfileNavigator = createStackNavigator(
    {
        Profile: { screen: Profile },
        Settings: { screen: Settings },
    },
    StackNavigatorOptions
);

const ToolNavigator = createStackNavigator(
    {
        DiagnosticTool: { screen: DiagnosticTool },
        DiagnosticToolResults: { screen: DiagnosticToolResults },
        DiagnosisDetailView: { screen: DiagnosisDetailView },
    },
    StackNavigatorOptions
);

const PetsNavigator = createStackNavigator(
    {
        Pets: { screen: Pets },
        PetDetailView: { screen: PetDetailView },
        AddPets: { screen: AddPets },
        TrainingScreen: { screen: TrainingScreen },
        EditScreen: { screen: EditScreen },
        ViewDocuments: { screen: ViewDocuments },
        PetPrescription: { screen: PetPrescription },
        PetDiet: { screen: PetDiet },
    },
    StackNavigatorOptions
);

const ChatNavigator = createStackNavigator(
    {
        ChatTest: { screen: ChatTest },
    },
    StackNavigatorOptions
);

const PatientsNavigator = createStackNavigator(
    {
        Patients: {screen: Patients}
    },
    StackNavigatorOptions
);

const HomeNavigator = createBottomTabNavigator(
    {
        Pets: { screen: PetsNavigator },
        DiagnosticTool: { screen: ToolNavigator },
        Profile: { screen: ProfileNavigator },
        Chat: { screen: ChatNavigator },
    },
    {
        animationEnabled: true,
        tabBarComponent: HomeTab,
        tabBarPosition: "bottom",
        swipeEnabled: false,
    }
);

const VetNavigator = createBottomTabNavigator(
    {
        Patients: { screen: PatientsNavigator },
        Profile: { screen: ProfileNavigator },
    },
    {
        animationEnabled: true,
        tabBarComponent: VetTab,
        tabBarPosition: "top",
        swipeEnabled: false,
    }
);

/*
const HomeNavigator = createSwitchNavigator(
    {
        Home: { screen: HomeTabs },
    },
    StackNavigatorOptions
);

const VetNavigator = createBottomTabNavigator(
    {
        VetHome: {screen: VetTabs},
    },
    StackNavigatorOptions
);*/

const SignUpNavigator = createStackNavigator(
    {
        SignUp: { screen: SignUpName },
        SignUpEmail: { screen: SignUpEmail },
        SignUpRole: { screen: SignUpRole },
        SignUpPassword: { screen: SignUpPassword },
        Walkthrough: { screen: Walkthrough },
    },
    StackNavigatorOptions
);

const AppNavigator = createAppContainer(
    createSwitchNavigator(
        {
            Loading: { screen: Loading },
            Welcome: { screen: Welcome },
            Login: { screen: Login },
            SignUp: { screen: SignUpNavigator },
            Home: { screen: HomeNavigator },
            Vet: { screen: VetNavigator },
        },
        StackNavigatorOptions
    )
);

export { AppNavigator };
