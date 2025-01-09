# PetCare App 🐾

Welcome to **PetCare App**—a mobile app built with love for pet owners! Whether you're a new pet parent or just looking to streamline your pet care routine, PetCare has got your back. From feeding schedules to health tracking and locating veterinarians, we've thought of everything you need to keep your furry friend happy and healthy. 🐶🐱

## Table of Contents 📚

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies](#technologies)
- [License](#license)
<!-- - [Contributing](#contributing) -->

---

## Features ✨

- **Feeding Schedule Management**: Keep your pet's feeding times and quantities logged with ease! 🥣
- **Health Tracking**: Record and track your pet's health progress, including feeding logs and more! 💪
- **Veterinarian Locator**: Find nearby veterinarians and keep your pet's health in top shape! 🐾
- **Admin Panel**: Admins can create and manage veterinarian accounts to help others care for their pets. 🐕‍⚕️
- **User Authentication**: Safe and secure login and password recovery features. 🔑
- **Firebase Integration**: Real-time sync for your pet care needs, so everything stays up-to-date. 🛠️
<!-- - **Push Notifications**: Get reminders for feeding times and pet care alerts. 🔔 -->

---

## Installation 🚀

Ready to get started? Here's how to set up your PetCare App locally! 🌱

1. **Clone the Repository**: Copy this repository to your local machine.

   ```bash
   git clone https://github.com/SemerNahdi/pettify.git
   ```

2. **Navigate to Your Project Folder**:

   ```bash
   cd pet-care-v3
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Firebase Setup**:

   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new Firebase project.
   - Add Firebase SDK configuration to your app (in `firebase-config.js` or a similar file).

---

## Setup 🔧

1. **Firebase Configuration**:

   - Make sure your Firebase project is ready, and add your Firebase credentials into the app's Firebase setup file.

2. **First Time Setup**:

   - The first time you run the app on a Firebase project, **comment out the data injection code** located in `src/components/Firebase.js`. This code initializes the disease information data for the pet diagnosis feature and creates an admin account in Firebase with the following credentials:

     - **Username**: ad@min.com
     - **Password**: temp123

   - **Important**: It is highly recommended that the password be changed before deploying the app publicly for security reasons.

   - **Note**: Be sure to comment out this code after running the app for the first time to avoid any issues with Firebase in the future.

3. **Admin Account**:

   - The admin account created with the default credentials is the only account that can create vet accounts. Although more admin accounts can be created through Firebase, it's advised to **keep the number of admins to a minimum** to ensure security and proper management.

4. **Creating Test Data**:

   If you'd like to populate your Firebase with some test data (for users, pets, and an admin account), the app includes a function called `createTestData()`. This function will:

   - Create a test user (`testuser@example.com`) with some test pet data (Dog, Cat, Bird).
   - Create a test veterinarian (`vetuser@example.com`) with a role of "vet".
   - Create an admin account (`ad@min.com`) with default credentials to manage the app.

   **Important**: This function should be executed **only once** when setting up Firebase for the first time, and the relevant data injection code should be commented out after use to avoid issues with future app runs.

---

## Technologies 🛠️

Here’s the tech that powers PetCare:

- **React Native**: For building the app and delivering a smooth, responsive experience across platforms.
- **Expo**: To streamline development and provide extra tooling for building mobile apps.
- **Firebase**: For real-time data storage and user authentication—keeping your data safe and synced.
<!-- - **react-native-push-notification**: For managing local push notifications, reminding pet parents of feeding times and more. 🔔
- **rn-pdf-reader-js**: For viewing PDFs related to pet care (like feeding guides and health records). 📑 -->

## License 📜

This project is licensed under the MIT License—see the [LICENSE.md](LICENSE.md) file for more details.
