import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const SliderItem = ({data}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.sliderImage} resizeMethod="resize" source={{uri:`https://image.tmdb.org/t/p/w500/${data.poster_path}`}}/>
            <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
            <View style={styles.rateContainer}>
                <Ionicons name='md-star' size={12} color="#e7a74e"/>
                <Text style={styles.rate}>{data.vote_average}/10</Text>

            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    container:{
        padding:14,
        width:140,
        height:180
    },
    title:{
        color:'#fff',
        fontSize:14,
        paddingTop:8

    },
    sliderImage:{
        width:'100%',
        height:170,
        borderRadius:8
    },
    rateContainer:{
        flexDirection:'row',
        alignItems:'center'

    },
    rate:{
        paddingLeft:4,
        paddingTop:2,
        color:'#fff',
        fontSize:12
    }

})

export default SliderItem
