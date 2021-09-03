# Installation

#### System Requirements:

-   Globally installed [node](https://nodejs.org/en/)>= 9
-   Globally installed [npm](https://www.npmjs.com/)>= 6

-   **Opt #1. Download ZIP**

    Not familiar with Git?
    Download this UI Theme from [gitstrap](https://gitstrap.com/WilliamCandillon/react-native-fiber-firebase).
    Extract the contents of ZIP file after downloading.
    Downloading ZIP file does not help you to sync with further updates of the App.

-   **Opt #2. Clone using GitStrap Web Client**

    To stay updated with future updates, [clone](https://gitstrap.com/WilliamCandillon/react-native-fiber-firebase) the repo from **gitstrap**.

-   Install packages for Full Version

```
cd App
npm install
or
yarn
```

-   **Firebase Backend only:**

    Run the following command

    ```
    yarn generate

    ```

-   **To simulate for iOS**

    -   **Method One:**
        -   Run `npm start` in your terminal.
        -   Scan the QR code in your Expo App.
    -   **Method Two:**
        -   Type `npx react-native run-ios` in your terminal.

-   **To simulate for Android**

    -   **Method One:**
        -   Run `npm start` in your terminal.
        -   Scan the QR code in your Expo App.
    -   **Method Two:**
        -   Make sure you have an `Android emulator` installed and running.
        -   Type `npx react-native run-android` in your terminal.

# Seed Project

Once you are ready to use this template for your own project, you might want to remove some screens. The entry point of the app is App.js, this file contains all the screens of the app organized into navigation routes. Once you removed the unnecessary routes, you can remove the folder that correspond to the screens you would like to remove. For instance, if you would like to remove the Overview screen, you need to remove its references from App.js and remove the src/overview folder. It's that simple.
