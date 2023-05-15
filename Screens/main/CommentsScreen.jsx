import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 32 }}>
        <Image source={{ uri: route.params.picture }} style={styles.img} />
      </View>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 6, marginHorizontal: 16 }}>
          <TextInput
            value={comment}
            onChangeText={(value) => setComment(value)}
            style={styles.comment}
            placeholder="Коментировать..."
            placeholderTextColor="#BDBDBD"
          />

          <TouchableOpacity
            onPress={() => {
              setComment("");
            }}
            style={styles.btn}
          >
            <AntDesign name="arrowup" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  img: {
    marginHorizontal: 16,
    height: 240,
    marginBottom: 8,
    borderRadius: 10,
  },
  comment: {
    position: "relative",
    height: 50,
    width: Dimensions.get("window").width - 32,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 50,
    backgroundColor: "#F6F6F6",
  },
  btn: {
    position: "absolute",
    top: 8,
    right: 8,
    height: 34,
    width: 34,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});
