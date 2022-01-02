import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";
import Stars from "react-native-stars";
import api, { key } from "../utils/Axios";
import Genres from "../components/Genres";

const MovieDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    let isAtctive = true;

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR",
          },
        })
        .catch((error) => {
          console.log(error);
        });
      setMovie(response.data);
    }

    getMovie();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="bookmark" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.banner}
        resizeMethod="resize"
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
      />
      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>

      <FlatList
        data={movie?.genres}
        style={styles.categories}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item)=>String(item.id)}
        renderItem={({item})=><Genres data={item}/>}
      />

      <View style={{ marginTop: 15 }}>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#e7a74e" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#e7a74e" />
          }
          halfStar={<Ionicons name="md-star-half" size={24} color="#e7a74e" />}
          disable={true}
        />
      </View>
      <Text
        style={{ color: "#fff", fontSize: 20, marginTop: 14, marginLeft: 14 }}
      >
        Overview
      </Text>
      <Text style={{ color: "#DDDDDD", fontSize: 14, margin: 14 }}>
        {movie.overview}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141a29",
  },
  header: {
    zIndex: 99,
    position: "absolute",
    top: 35,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 14,
    paddingRight: 14,
  },

  headerButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(25 ,26, 48 ,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: "100%",
    height: "38%",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
    alignSelf: "center",
  },
  categories: {
    padding: 14,
    maxHeight:60,
    minHeight:35,
    alignSelf:"center"
  },
  infoStyle: {
    color: "#DDDDDD",
    fontSize: 12,
  },
  starArea: {},
});

export default MovieDetails;
