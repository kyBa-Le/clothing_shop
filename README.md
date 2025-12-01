# Clothing Ecommerce App

This is my **Ecommerce** mobile application project built with **React Native**, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

The app is designed to provide a modern shopping experience, featuring product listings, a cart system, user authentication and admin management.

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
│   ├── asset/            # Images, icons, fonts, etc.
│   ├── component/        # Reusable UI components
│   ├── constant/         # The application constants
│   ├── database/         # Tables initialization and mock data
│   ├── layout/           # Layout of screens
│   ├── page/             # App screens (Home, Cart, Product, etc.)
│   ├── service/          # Data services
│   ├── type/             # Entity types definition
│   └── App.tsx           # Entry point of the app
│
├── android/              # Native Android project
├── ios/                  # Native iOS project
├── package.json
└── README.md
```

## Other information
### User authentication:
```You can register an account and login directly to the application to see the customer side's features```
### Admin authentication:
```The default admin account is pre-created in this application```
- username: ```admin```
- password: ```admin```