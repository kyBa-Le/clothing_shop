# Clothing Ecommerce App (React Native)

This is a new **Ecommerce** mobile application built with **React Native**, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

The app is designed to provide a modern shopping experience, featuring product listings, a cart system, user authentication, and more — optimized for both **iOS** and **Android**.

---

## 📦 Installation

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Clone the repository

```bash
git clone https://github.com/kyBa-Le/clothing_shop
cd clothing_shop
```

### Step 2: Install dependencies
Using npm:
```bash
npm install
```

### Step 3: Start the Metro server
```
npx react-native start
```
### Step 4: Run the app
For Android:
```
npx react-native run-android
```
For iOS:
```
npx react-native run-ios
```
## Project Structure
```
ecommerce-app/
│
├── src/
│   ├── assets/           # Images, icons, fonts, etc.
│   ├── components/       # Reusable UI components
│   ├── navigation/       # React Navigation setup
│   ├── page/             # App screens (Home, Cart, Product, etc.)
│   ├── type/             # Entity types definition
│   ├── services/         # Data services
│   ├── utils/            # Helper functions and constants
│   └── App.tsx           # Entry point of the app
│
├── android/              # Native Android project
├── ios/                  # Native iOS project
├── package.json
└── README.md
```