import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {Feather} from '@expo/vector-icons'



const Search = () => {
    return (
        <View  style={styles.searchContainer}>
            <TextInput 
            style={styles.textInput}
            placeholder='search your favorite movies'
            />

            <TouchableOpacity style={styles.searchButton}>
              <Feather name="search" size={24} color="#fff"/>

            </TouchableOpacity>                     
        </View>
    )
}


const styles=StyleSheet.create({
    searchContainer:{
        flexDirection:'row',
        width:'100%',
        height:50,
        alignItems: 'center',
        marginBottom:8
    },

    textInput:{
        backgroundColor:'gray',
        width:'85%',
        height:50,
        borderRadius:50,
        padding: 14  ,
        fontSize:18,
        color:'#fff',
        marginLeft:10

    },

    searchButton:{
        width:'15%',
        alignItems:'center',
        justifyContent:'center'
    }
})

export default Search
