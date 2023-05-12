import React, { useState } from "react";

import RegistrationScreen from "./Screens/RegistrationScreen.jsx";
import LoginScreen from "./Screens/LoginScreen.jsx";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

const AuthStack = createStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <>
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
          <AuthStack.Screen
            options={{
              headerShown: false,
            }}
            name="Register"
            component={RegistrationScreen}
          />
        </AuthStack.Navigator>
      </NavigationContainer>

      {/* <RegistrationScreen /> */}
      {/* <LoginScreen /> */}
    </>
  );
}
