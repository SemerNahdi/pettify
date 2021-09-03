# Packages Used

_package.json_

<pre class="line-numbers"><code class="language-json">{
  "name": "react-native-fiber-firebase",
  "version": "2.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "eject": "expo eject",
    "test": "jest",
    "test:watch": "jest --watch",
    "flow": "flow check --show-all-errors | flow-result-checker",
    "lint": "eslint App.js App.test.js src/",
    "deploy:expo": "expo publish",
    "deploy": "firebase deploy --token \"$FIREBASE_TOKEN\" && yarn deploy:expo"
  },
  "dependencies": {
    "@expo/vector-icons": "^12.0.0",
    "@react-native-community/masked-view": "0.1.10",
    "autobind-decorator": "^2.4.0",
    "crypto-js": "3.1.9-1",
    "expo": "~40.0.0",
    "expo-app-loading": "^1.0.1",
    "expo-asset": "~8.2.1",
    "expo-blur": "~8.2.2",
    "expo-camera": "~9.1.0",
    "expo-constants": "~9.3.3",
    "expo-file-system": "~9.3.0",
    "expo-font": "~8.4.0",
    "expo-image-manipulator": "~8.4.0",
    "expo-image-picker": "~9.2.0",
    "expo-linear-gradient": "~8.4.0",
    "expo-permissions": "~10.0.0",
    "expo-status-bar": "~1.0.3",
    "firebase": "7.9.0",
    "jest-junit-reporter": "^1.1.0",
    "lodash": "^4.17.20",
    "mobx": "^6.0.4",
    "mobx-react": "^7.0.5",
    "moment": "^2.29.1",
    "native-base": "^2.13.15",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "https://github.com/expo/react-native/archive/sdk-40.0.1.tar.gz",
    "react-native-gesture-handler": "~1.8.0",
    "react-native-reanimated": "~1.13.0",
    "react-native-screens": "~2.15.0",
    "react-native-svg": "12.1.0",
    "react-native-swiper": "^1.6.0",
    "react-native-web": "~0.13.12",
    "react-navigation": "^4.4.3",
    "react-navigation-stack": "^2.10.2",
    "react-navigation-tabs": "^2.10.1"
  },
  "devDependencies": {
    "@babel/core": "~7.9.0",
    "babel-eslint": "^8.2.1",
    "babel-preset-expo": "^7.0.0",
    "eslint": "^4.9.0",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-plugin-flowtype": "^2.41.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.2",
    "eslint-plugin-react": "^7.4.0",
    "eslint-plugin-react-native": "^3.2.1",
    "expo-cli": "3.4.1",
    "firebase-tools": "7.0.0",
    "flow-bin": "0.63.1",
    "flow-result-checker": "^0.3.0",
    "jest-expo": "^35.0.0",
    "react-test-renderer": "16.0.0-alpha.12"
  },
  "private": true
}


</code></pre>
