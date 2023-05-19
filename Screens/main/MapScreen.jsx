import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  // console.log(route.params);
  const { longitude, latitude } = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          // latitude: latitude,
          // longitude: longitude,
          latitude: 50.516339,
          longitude: 30.602185,
          latitudeDelta: 0.01,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{
            // latitude: latitude,
            // longitude: longitude,
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
