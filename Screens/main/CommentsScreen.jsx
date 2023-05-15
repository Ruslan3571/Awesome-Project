import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function CommentsScreen({ route }) {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 32 }}>
        <Image source={{ uri: route.params.picture }} style={styles.img} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  img: { marginBottom: 8, borderRadius: 8, marginHorizontal: 16, height: 240 },
});
