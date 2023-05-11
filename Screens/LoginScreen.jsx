import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isPasswordShow, setIsPasswordShow] = useState(true);

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
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Войти</Text>
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
                <Text style={styles.btnTitle}>Войти</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.login}>Нет аккаунта? Зарегистрироваться</Text>
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

  form: {
    position: "relative",
    paddingTop: 32,
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
  //   inputActive: {
  //     backgroundColor: "#FFFFFF",
  //     borderColor: "#FF6C00",
  //   },
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
