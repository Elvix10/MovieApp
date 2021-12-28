import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";

import Hedear from "../components/Hedear";
import Search from "../components/Search";
import SliderItem from "../components/SliderItem";
import api, { key } from "../utils/Axios";
import { getListMovies } from "../utils/movies";

const Home = () => {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoadind]=useState(true)

  useEffect(() => {
    let isActive = true;

    async function getMovies() {
    
      const [nowData, popularData, TopData]= await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          }
        }),
        api.get("/movie/popular", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          }
        }),
        api.get("/movie/top_rated", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          }
        })
      ])

     setNowMovies(nowData.data.results)
     setPopularMovies(popularData.data.results)
     setTopMovies(TopData.data.results)
     setLoadind(false)
    }
   
    console.log('test')
    console.log(nowMovies.poster_path)
    console.log('test')

   

    getMovies();
  }, []);

  if(loading){
    return(
      <View style={{alignItems:'center', justifyContent='center'}}>
        <ActivityIndicator size='large' color="#fff"/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Hedear title="CVflix" />
      <Search />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleDestaque}>Em destaque</Text>
        <TouchableOpacity>
          <Image
            resizeMethod="resize"
            style={styles.image}
            source={{
              uri: "https://media.istockphoto.com/photos/shocked-young-couple-watching-a-movie-at-home-picture-id1284279640?s=612x612",
            }}
          />
        </TouchableOpacity>

        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Text style={styles.titleDestaque}>Populares</Text>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />
        <Text style={styles.titleDestaque}>Mais Votados</Text>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} />}
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
