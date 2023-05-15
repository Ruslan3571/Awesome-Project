import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  console.log(route.params);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // latitude: route.params?.location?.coords.latitude,
          // longitude: route.params?.location?.coords.longitude,
          latitude: 50.516339,
          longitude: 30.602185,
          latitudeDelta: 0.01,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            // latitude: route.params?.location?.coords.latitude,
            // longitude: route.params?.location?.coords.longitude,
            latitude: 50.516339,
            longitude: 30.602185,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
