import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./Screens/auth/LoginScreen.jsx";
import RegistrationScreen from "./Screens/auth/RegistrationScreen.jsx";
import PostsScreen from "./Screens/main/PostsScreen.jsx";
import CreatePostsScreen from "./Screens/main/CreatePostsScreen.jsx";
import ProfileScreen from "./Screens/main/ProfileScreen.jsx";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
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
    );
  }
  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={25} color="#212121" />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          headerTitleStyle: {
            color: "#212121",
            fontSize: 17,
            background: "#FFFFFF",
          },
          headerLeft: () => (
            <TouchableOpacity style={{ marginRight: 55, paddingLeft: 15 }}>
              <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.plusIcon}>
              <AntDesign name="plus" size={24} color="#212121" />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color="#212121" />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  plusIcon: {
    display: "flex",
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
