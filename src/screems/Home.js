import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Hedear from "../components/Hedear";
import Search from "../components/Search";
import SliderItem from "../components/SliderItem";
import api, { key } from "../utils/Axios";
import { getListMovies, randomBanner } from "../utils/movies";

const Home = () => {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;

    async function getMovies() {
      const [nowData, popularData, TopData, UpcomingData] = await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/popular", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/top_rated", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/upcoming", {
          params: {
            api_key: key,
            page: 1,
          },
        }),
      ]);

      setNowMovies(nowData.data.results);
      setPopularMovies(popularData.data.results);
      setTopMovies(TopData.data.results);
      setUpcomingMovies(UpcomingData.data.results);
      setBannerMovie(nowData.data.results[Math.floor(Math.random() * 5)]);
      setLoading(false);
    }

    getMovies();
  }, []);

  function navigateMovieDetails(movie) {
    navigation.navigate("movieDetail", { id: movie.id });
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#141a29",
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Hedear title="CVflix" />
      <Search />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleDestaque}>Em destaque</Text>
        <TouchableOpacity onPress={() => navigateMovieDetails(bannerMovie)}>
          <Image
            resizeMethod="resize"
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500/${bannerMovie.poster_path}`,
            }}
          />
        </TouchableOpacity>

        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigateMovie={() => navigateMovieDetails(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Text style={styles.titleDestaque}>Populares</Text>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigateMovie={() => navigateMovieDetails(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />

        <Text style={styles.titleDestaque}>Em Breve</Text>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={upcomingMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigateMovie={() => navigateMovieDetails(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
        <Text style={styles.titleDestaque}>Mais Votados</Text>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigateMovie={() => navigateMovieDetails(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141a29",
    padding: 4,
  },
  titleDestaque: {
    marginTop: 20,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 14,
  },
  image: {
    height: 150,
    borderRadius: 8,
    marginLeft: 14,
    marginRight: 14,
  },
  flatlist: {
    height: 250,
  },
});

export default Home;
