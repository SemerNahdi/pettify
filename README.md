# PetCare App  🐾

Welcome to **PetCare App**—a mobile app built with love for pet owners! Whether you're a new pet parent or just looking to streamline your pet care routine, PetCare has got your back. From feeding schedules to health tracking and locating veterinarians, we've thought of everything you need to keep your furry friend happy and healthy. 🐶🐱

## Table of Contents 📚

- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

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

5. **Push Notification Setup**: Follow the instructions on the [React Native Push Notification documentation](https://github.com/zo0r/react-native-push-notification) to enable notifications for your app.

---

## Setup 🔧

1. **Firebase Configuration**:

   - Make sure your Firebase project is ready, and add your Firebase credentials into the app's Firebase setup file.

2. **Push Notifications**:

   - Set up `react-native-push-notification` to allow your app to send reminders about feeding times and health checks.

3. **Expo Setup**:
   - If you don't have Expo CLI installed yet, get it here: [Expo CLI](https://expo.dev/).
   - Run the app in the simulator or on your physical device by using the following:
     ```bash
     npm start
     ```

---

## Usage 💡

Once everything is up and running, here’s how you can make the most out of the app:

- **Feeding Schedule**: Log your pet's feeding time, quantities, and status, ensuring they're always well-fed. 🥗
- **Health Management**: Keep track of feeding logs and monitor your pet’s health progress. 📈
- **Veterinarian Locator**: Use the app to find nearby vets who can take care of your pet's health needs. 🏥
- **Admin Panel**: Admins can create and manage accounts for veterinarians to help users access reliable pet care. 👩‍⚕️

---

## Technologies 🛠️

Here’s the tech that powers PetCare:

- **React Native**: For building the app and delivering a smooth, responsive experience across platforms.
- **Expo**: To streamline development and provide extra tooling for building mobile apps.
- **Firebase**: For real-time data storage and user authentication—keeping your data safe and synced.
<!-- - **react-native-push-notification**: For managing local push notifications, reminding pet parents of feeding times and more. 🔔
- **rn-pdf-reader-js**: For viewing PDFs related to pet care (like feeding guides and health records). 📑 -->

---

## Contributing 💖

Contributions are always welcome! We believe in the power of community and collaboration to make PetCare better for everyone.

1. **Fork the Repository**: Start by creating your own fork of the repository.
2. **Create a New Branch**:
   ```bash
   git checkout -b feature-your-feature
   ```
3. **Make Your Changes**: Add that awesome feature or fix the bug you’ve been thinking about. ✨
4. **Commit Your Changes**:
   ```bash
   git commit -m "Add feature or fix bug"
   ```
5. **Push to Your Fork**:
   ```bash
   git push origin feature-your-feature
   ```
6. **Create a Pull Request**: Let’s collaborate and review your changes! 😊

---

## License 📜

This project is licensed under the MIT License—see the [LICENSE.md](LICENSE.md) file for more details.

---
