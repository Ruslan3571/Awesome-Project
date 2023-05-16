import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Home";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

export default function PostsScreen({ navigation }) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{
          title: "Публикации",
          headerTitleStyle: {
            color: "#212121",
            fontSize: 17,
            lineHeight: 22,
            background: "#FFFFFF",
          },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Комментарии"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Карта" }}
      />
    </NestedScreen.Navigator>
  );
}
