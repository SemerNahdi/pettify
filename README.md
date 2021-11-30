# PETCARE v3.0.0

This project is an iOS based app using React Native that is meant to help facilitate resources for new pet owners. From fiding instructional videos pertinent to your pet's breed to finding nearest veterinarians and much more.

### Built With
* [Firebase](https://firebase.google.com/)
* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* Javascript
* Node.js
* Yarn
* VSCode

## Prerequisites

### Setting up Firebase data
   - Start a Firebase project at your [Firebase Console](https://console.firebase.google.com) and copy the credentails from Project Settings from your Firebase project to src/components/Firebase.js so that the app can communicate with Firebase

   - Make sure the Firebase project make has Authentication through Email/Password as the Sign-in method. 
   -This is optional for Firestore but to prevent Firebase sending warning that Firestore rules are not strong enough you can set the rules to be as follows with an updated date
      ```
      rules_version = '2';
      service cloud.firestore {
         match /databases/{database}/documents {
            match /{document=**} {
               allow read, write: if
                  request.time < timestamp.date(yyyy, mm, dd);
            }
         }
      }
      ```

   - The first time this project is run on a Firebase project, comment out the data injection code located in src/components/Firebase.js, this code will initialize the disease information data for the pet diagnosis feature. It will also create an admin in Firebase with <br />
   default username: "ad.min" <br />
   default password: "temp123" <br />
   and is reccomended that the password is changed before deploying the app publicly. <br />

      ---

      **Be sure to comment this code after running the app for the first time to prevent any issues with Firebase in the future**

   - The admin account is the only account that can create vets, while other admin account can be created
   through Firebase it is advised that the amount of admin be kept to a minimums. 

This step is optional for Mac users that want to use the built-in iOS simulator
and involves using Homebrew to install Watchman for easier use of the emulator **(results may vary)**
* Homebrew
  ```sh
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
  ```
* Watchman
  ```sh

  ```

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/OAKevin/pet-carev3.git
   ```
2. Install expo globally to be able to launch the app (yarn command may have changed recently, actual syntax might differ)
   ```sh
   yarn add --global expo-cli
   ``` 
3. Install node package modules with yarn using 
   ```sh
   yarn install
   ```
4. Run the app with expo
   ```sh
   expo start
   ```

   ---

   If expo does not start up the app then using the following command will create an expo app that will start with the previous command 
   ```sh
   expo init pet-care
   ```

<!-- GETTING STARTED -->
## Getting Started
-The main entry point for the App is the App.js file
-We use Expo for development and yarn

<!-- ROADMAP -->
## Roadmap

<Whatever we have planned to do on this iteration of the app and what we want the next team to complete>

<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements