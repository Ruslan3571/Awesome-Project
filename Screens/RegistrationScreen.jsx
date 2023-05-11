import React, { useState } from "react";
import { Camera } from "expo-camera";
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
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};


export default function RegistrationScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require("../assets/images/bg.png")}>
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
              <Camera style={styles.camera}>
                <View style={styles.cameraContainer}>
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </View>
              </Camera>

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

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>

              <TouchableOpacity>
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
    bottom: 15,
    right: -10,
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
