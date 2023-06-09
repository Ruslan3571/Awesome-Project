import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import db from "../../firebase/config";
import { Feather } from "@expo/vector-icons";

export default function Home({ route, navigation }) {
  const [posts, setPosts] = useState([]);
  const { email, picture, login } = useSelector((state) => state.auth);
  console.log(route.params);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image source={{ uri: picture }} style={styles.avatar} />
        <View style={styles.nameEmail}>
          <Text style={styles.login}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <View style={{ marginTop: 32 }}>
              <Image source={{ uri: item.picture }} style={styles.img} />
              <Text style={styles.title}>{item.title.value}</Text>
            </View>
            <View style={styles.wraper}>
              <TouchableOpacity
                style={styles.comments}
                onPress={() =>
                  navigation.navigate("Комментарии", {
                    postId: item.id,
                    picture: item.picture,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={{ display: "flex", flexDirection: "row" }}
                  onPress={() =>
                    navigation.navigate("Map", {
                      location: item.location,
                    })
                  }
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.place}>{item.place.value}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 16,
    marginTop: 32,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  login: {
    fontSize: 13,
    lineHeight: 15,
    color: "#212121 ",
  },
  email: {
    fontSize: 11,
    color: "#212121",
  },
  img: {
    marginHorizontal: 16,
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  wraper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  comments: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentsCount: {
    marginLeft: 6,
    fontSize: 16,
    color: "#BDBDBD",
  },
  place: {
    textAlign: "right",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
