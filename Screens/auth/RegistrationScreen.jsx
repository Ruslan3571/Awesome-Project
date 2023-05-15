import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
  picture: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [picture, setPicture] = useState("");

  const takePicture = async () => {
    const picture = await camera.takePictureAsync();
    console.log(picture);
    setPicture(picture.uri);
  };

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/bg.png")}
        >
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
            <View
              style={{
                ...Platform.select({
                  ios: {
                    ...styles.form,
                    marginBottom: isShowKeyboard ? 180 : 0,
                  },
                  android: {
                    ...styles.form,
                    paddingBottom: isShowKeyboard ? 0 : 78,
                  },
                }),
              }}
            >
              <Camera style={styles.camera} ref={setCamera} type={CameraType.front}>
                {picture && (
                  <View style={styles.cameraContainer}>
                    <Image source={{ uri: picture }} style={styles.picture} />
                  </View>
                )}
              </Camera>
              {picture && (
                <TouchableOpacity
                  style={styles.touch}
                  onPress={() => {
                    setPicture("");
                  }}
                >
                  <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
                </TouchableOpacity>
              )}
              {!picture && (
                <TouchableOpacity style={styles.touch} onPress={takePicture}>
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              )}

              <View style={styles.header}>
                <Text style={styles.headerTitle}>Регистрация</Text>
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Логин"
                  value={state.login}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Адрес электронной почты"
                  value={state.email}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>

              <View>
                <TextInput
                  style={styles.input}
                  secureTextEntry={isPasswordShow}
                  placeholder="Пароль"
                  value={state.password}
                  onFocus={() => setIsShowKeyboard(true)}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <Text
                  onPress={() => {
                    setIsPasswordShow(!isPasswordShow);
                  }}
                  style={styles.showPassword}
                >
                  {isPasswordShow ? "Показать" : "Скрыть"}
                </Text>
              </View>

              <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.login}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  header: {
    alignItems: "center",
  },
  headerTitle: {
    marginBottom: 33,
    fontSize: 30,
    fontWeight: 500,
  },
  camera: {
    flex: 1,
    width: 120,
    height: 120,
    position: "absolute",
    top: -60,
    left: 135,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    overflow: "hidden",
  },
  cameraContainer: {
    position: "absolute",
  },
  picture: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  touch: {
    position: "absolute",
    bottom: 510,
    right: 129,
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },

  form: {
    position: "relative",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },

  input: {
    margin: 8,
    padding: 16,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    color: "#212121",
  },
  btn: {
    height: 51,
    margin: 16,
    marginTop: 43,
    padding: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Platform.OS === "ios" ? "transparent" : "#FF6C00",
  },
  btnTitle: {
    color: "#FFFFFF",
  },
  showPassword: {
    position: "absolute",
    top: 21,
    right: 30,
    color: "#1B4371",
    fontSize: 16,
  },
  login: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
  },
});
