import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Home";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

export default function PostsScreen() {
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
            background: "#FFFFFF",
            textAlign: "left",
            marginLeft: 120,
          },
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Комментарии" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
}
