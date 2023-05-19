import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import db from "../../firebase/config";

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  const takePicture = async () => {
    const { uri } = await camera.takePictureAsync();
    setPicture(uri);
  };
  const sendData = () => {
    uploadPostToServer();
    navigation.navigate("Home", { picture });
    setPicture("");
    setTitle("");
    setPlace("");
  };
  const uploadPostToServer = async () => {
    const picture = await uploadPhotoToServer();
    const createPost = await db.firestore().collection("posts").add({
      picture,
      title,
      location: location.coords,
      place,
      userId,
      login,
    });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(picture);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera} type={CameraType.back}>
          {picture && (
            <View style={styles.cameraContainer}>
              <Image source={{ uri: picture }} style={styles.picture} />
            </View>
          )}
          {!picture && (
            <TouchableOpacity onPress={takePicture} style={styles.snap}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          )}
          {picture && (
            <TouchableOpacity
              onPress={() => {
                setPicture("");
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                backgroundColor: "#ffffff4c",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </Camera>
        <Text style={styles.text}>
          {!picture ? "Загрузите фото" : "Редактировать фото"}
        </Text>
        <View>
          <TextInput
            style={styles.title}
            placeholder={"Название..."}
            value={title}
            onChangeText={(value) => {
              setTitle((prevState) => ({ ...prevState, value }));
            }}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <TextInput
            style={styles.place}
            placeholder={"Местность..."}
            value={place}
            onChangeText={(value) => {
              setPlace((prevState) => ({ ...prevState, value }));
            }}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <View style={{ position: "absolute", top: 77, left: 15 }}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </View>
        </View>
        <TouchableOpacity style={styles.btnSubmit} onPress={sendData}>
          <Text style={styles.btnText}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  camera: {
    height: 240,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 32,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    position: "absolute",
  },
  snap: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    height: 240,
    borderRadius: 8,
    width: Dimensions.get("window").width - 32,
  },
  text: {
    marginLeft: 16,
    marginTop: 8,
    color: "#BDBDBD",
    marginBottom: 32,
    fontSize: 16,
  },
  btnSubmit: {
    marginHorizontal: 16,
    marginTop: 32,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  title: {
    paddingBottom: 16,
    paddingTop: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
  },
  place: {
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 28,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
  },
});
