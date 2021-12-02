# PETCARE v3.0.0

This project is an iOS based app using React Native that is meant to help facilitate resources for new pet owners. From fiding instructional videos pertinent to your pet's breed to finding nearest veterinarians and much more.

### Built With
* [Firebase](https://firebase.google.com/)
* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Node.js](https://nodejs.org/en/)
* [VSCode](https://code.visualstudio.com/)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
* [Git](https://git-scm.com/downloads)
* [Javascript](https://www.javascript.com/)

## Prerequisites

### Setting up the Coding Environment 

   * This project relies on [Node.js](https://nodejs.org/en/) for ReactNative development and package installers, be sure to be on the latest version to prevent any issues

   * [VSCode](https://code.visualstudio.com/) and its built in Terminal was used by most of the team to make changes to the project and install packages

   * [Git](https://git-scm.com) and **GutHub** were used for version control

   * This project is mainly tested on iOS and may look and/or preform differently on AndroidOS <br/>
   **(iOS device with ExpoGo app was main source of testing and debugging)**

   * While npm can used to run the app, yarn was used instead due to some consistency issues with the team <br/>
   yarn can be downloaded through instructions found on [Yarn's](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) install page
   **([npm](https://nodejs.org/en/download/current/) was used to install yarn for most developers on this project)** <br/>
   If you wish to use npm instead of yarn be sure to delete the yarn.lock file first to prevent confusion

   * Due to the previous teams using Flow for type setting and possible debugging, the most popular VSCode extension (Visual Studio IntelliCode, id:visualstudioexptteam.vscodeintellicode) would frequently complain about TypeScript intertwinned with JavaScript. Flow is not a necessary technology and has been slowly removed from the project but not all traces of Flow have been removed, to prevent IntelliCode from constantly complaining about Flow type setting there is a Setting in VSCode that can be disabled to make it easier to navigate and develop called(JavaScript Validate Enable), uncheck this setting to remove the warnings from IntelliCode

### Setting up Firebase data

   * Start a Firebase project at your [Firebase Console](https://console.firebase.google.com) and copy the credentails from Project Settings from your Firebase project to src/components/Firebase.js so that the app can communicate with Firebase

   * Make sure the Firebase project make has Authentication through Email/Password as the Sign-in method. 

   * This is optional for Firestore but to prevent Firebase sending warning that Firestore rules are not strong enough you can set the rules to be as follows with an updated date

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

   * The first time this app is ran on a Firebase project, comment out the data injection code located in src/components/Firebase.js, this code will initialize the disease information data for the pet diagnosis feature. It will also create an admin in Firebase with <br />
   default username: "ad@min.com" <br />
   default password: "temp123" <br />
   and is reccomended that the password is changed before deploying the app publicly. <br />

      ---

      **Be sure to comment this code after running the app for the first time to prevent any issues with Firebase in the future**

   * The admin account is the only account that can create vets, while other admin account can be created
   through Firebase it is advised that the amount of admin be kept to a minimums. 

### Mac

   This step is optional for Mac users that want to use the built-in iOS simulator
   and involves using Homebrew to install Watchman for easier use of the emulator **(results may vary)**

   * Homebrew

      ```sh
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
      ```

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/OAKevin/pet-carev3.git
   ```
2. Install expo globally to be able to launch the app (yarn command may have changed recently, actual syntax might differ)
   ```sh
   yarn global add expo-cli # npm: npm install -g expo-cli
   ``` 
3. Install node package modules with yarn using 
   ```sh
   yarn install # npm: npm install 
   ```
4. Run the app with expo
   ```sh
   expo start # you can also use: yarn start or npm start
   ```

   ---

   If expo does not start up the app then using the following command will create an expo app that will start with the previous command 
   ```sh
   expo init pet-care
   ```

## Accomplishments
   
   * UI, UX and Theme

      - The background has been changed to match the theme of the app and its purpose.
      - The look of the touchable pet items has been redesigned to look more appealing and organized. The layout of the pet item is more focused on being readable and contain relevant information.
      - Diagnosis Result items were made to contrast more against the new background pattern.
      - Diagnosis Tool buttons and labels were changed to react to what pet is selected to improve the user experience. This way the user knows which pet they are trying to diagnose at all times.
      - All dropdowns throughout the app have been changed to a new dropdown that looks and work better than all previous ones so that the user experience is as smooth as possible.
      - The Diagnosis Tool Dropdown was remade with another package to make it more consistent with the rest of the app dropdowns, the search feature of the dropdown looks better and no longer overlaps with the dropdown toggle.
      - Pet Diet Screen buttons were redesigned so that they toggle on and off visibly, were before the buttons did not toggle nor did they show if they were selected or not. 
      - Adding Pets and Editing Pet information UI/UX was redesigned and made consistent between them. Text boxes were made to match new and improved dropdowns and buttons were added on simple options.
      
      <br/>

   * Functionality

      - Vet view was implemented so that vets have access to Patients and their Pets so that they can provide prescriptions, diets, and lab documents effectively.
      - Admin account that is the only account type that has the ability to create Vets and still has all the functionality of a Vet account.
      - Data on screen automatically refreshes when data is changed for a Patient or Pet, this makes the app feel responsive and live when using the app. Before to see any changes you had to re-navigate to the screen and in some cases this meant signing out and back into the account.
      - Forgot Password option on Login Screen so that users can reset their password if they lose their information or for new vets to create a secure login.
      - Additions to Profile and Settings screen were address information can be stored. Both email and deletion of profile needs user password confirmation to proceed.

      <br/>

   * Database

      - Efficiency added so that data stored on Firebase Firestore is more simple and contains more relevant information and less unused information.
      - Organization added to Firebase Storage where data is stored with no waste in mind. If a profile or pet picture is changed the previous photo file is deleted from the database before the new one is uploaded. This also works for when a pet or profile is deleted, all data tied to the user and all their pets is deleted from all areas of the Firebase database. The main reason for this system is to prevent an overflow or if any unused data in the database.
      - Data injection is now included in the project itself, all data relating to the diseases is uploaded to the linked Firebase project, as well as a default admin profile is added for ease of use to start creating vets and use the app at full functionality
      - Additional disease data was added to data injection for Birds, where there was no none before.
      - Pet Diet and Prescription data is now stored chronologically and allows for it to be read in the app in chronological order which now ensures that the data can be looked at correctly with the most relevant data at the top.

      <br/>

   * Codebase Improvements
      - Unused files and code were removed in large portions to make the file structure of the project is more clean, readable and easier to navigate.
      - Files pertaining to certain screens were refactored so that we were easier to read, preform better, and more visually pleasing on the app.
      - The start of removal of Flow techonology code, Flow is a type setting technology that makes it possible to create object like data strcutres in JavaScript. While Flow is not negative to the compilation of the app, it creates an extra level of complexity when reading code that contains Flow. All code touched so far can be ran without any Flow and thus has begun deprecation for the entire project.
      - Unnecessary node packages were removed from package.json file and with more optimization of the project more node packages can be removed to increase the simplicity of the project.

## Future Desired Features
   
   * Further Optimization of the Codebase (including continuation of Flow removal throughout the app, better use of data structures and further improvements to UI/UX).
   * Forum Board tab feature that allows for Patients to be able to post questions or discussions for Vets to respond to and communicate back and forth.
   * Map tab feature that can be used for posting lost pets and/or locating nearby shelters and veterinarians.

## Sample Photos of App

   * Welcome <br/> <img src="https://user-images.githubusercontent.com/27313646/144299581-572cc441-f9a2-4777-a37f-fd1b335affa9.PNG" width="300"/>
   * Vet View <br/> <img src="https://user-images.githubusercontent.com/27313646/144300263-2de045ed-d597-452a-8756-63d379a22bfb.PNG" width="300"/>
   * Pet View <br/> <img src="https://user-images.githubusercontent.com/27313646/144300550-9264c2e9-4991-4c27-bdde-7aaa3b2b9db1.PNG" width="300"/>
   * Add Pet <br/> <img src="https://user-images.githubusercontent.com/27313646/144300608-763c5db2-97c2-4527-8175-185e93f74341.PNG" width="300"/>
   * Pet Detail <br/> <img src="https://user-images.githubusercontent.com/27313646/144300656-3650ce5d-2c02-4bdb-b619-95b638b08206.PNG" width="300"/>
   * Pet Edit <br/> <img src="https://user-images.githubusercontent.com/27313646/144300741-045199d1-753c-4ee3-b565-b3092df49f12.PNG" width="300"/>
   * Training Video <br/> <img src="https://user-images.githubusercontent.com/27313646/144300780-cf2802ac-9d12-4769-aa31-036acfc10d2a.PNG" width="300"/>
   * Prescription <br/> <img src="https://user-images.githubusercontent.com/27313646/144300833-1be3e48a-86cc-4d8e-b6f3-18b360759be1.PNG" width="300"/>
   * Diet <br/> <img src="https://user-images.githubusercontent.com/27313646/144300889-28d3d3c3-04e4-4c26-ab1e-c31c4a33e6b3.PNG" width="300"/>
   * Profile <br/> <img src="https://user-images.githubusercontent.com/27313646/144301037-13881967-8396-4243-8c1e-0729425e2c62.PNG" width="300"/>
   * Diagnosis <br/> <img src="https://user-images.githubusercontent.com/27313646/144301101-a3787140-3d7f-47e8-87c2-1bd252e7f565.PNG" width="300"/>
   * Diagnosis Dropdown <br/> <img src="https://user-images.githubusercontent.com/27313646/144301154-62efeb64-cae0-4f52-be3b-dfdbe5afe5f9.PNG" width="300"/>
   * Diagnosis Selected Items <br/> <img src="https://user-images.githubusercontent.com/27313646/144301205-97117beb-663b-4656-a7f2-005188763635.PNG" width="300"/>
   * Diagnosis Results <br/> <img src="https://user-images.githubusercontent.com/27313646/144301273-1de07cd8-16fd-4bf3-9617-1b3d5dc65bf4.PNG" width="300"/>
   * Diagnosis Details <br/> <img src="https://user-images.githubusercontent.com/27313646/144301324-aa8dca8e-fe25-41d6-b234-1c2f4a4c8891.PNG" width="300"/>
   * Reset Password <br/> <img src="https://user-images.githubusercontent.com/27313646/144301931-d375cfef-8a2a-4d43-8354-c4fb6064f453.PNG" width="300"/>
