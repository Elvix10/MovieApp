import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Genres = ({data}) => {
    return (
        <View style={styles.container}>
            <Text>{data.name}</Text>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        marginRight:8,
        backgroundColor:'#ddd',
        alignItems:'center',
        justifyContent:'center',
        padding:5,
        borderRadius:8,
        

    },
    categoryName:{

    }
})

export default Genres
