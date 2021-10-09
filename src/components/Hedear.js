import React from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'

const Hedear = ({title}) => {

    const navigation=useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={()=>navigation.openDrawer()}>
                <Feather name="menu" size={36} color="#fff"/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        height:70,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:10

    },
    menuButton:{
        height:70,
        alignItems:'center',
        flexDirection:'row'
    },
    title:{
        color:'#fff',
        fontSize:30,
        fontWeight:'bold',
        marginLeft:10
    }

})


export default Hedear
