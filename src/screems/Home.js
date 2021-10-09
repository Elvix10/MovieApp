import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Hedear from '../components/Hedear'
import Search from '../components/Search'

const Home = () => {
    return (
        <View style={styles.container}>
            <Hedear title='Tugaflix'/>
            <Search/>
            
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#141a29',
        padding:4
    }
})

export default Home
