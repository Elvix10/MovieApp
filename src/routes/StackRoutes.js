import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screems/Home'
import MovieDetails from '../screems/MovieDetails';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Home" 
      component={Home}
      options={{
        headerShown:false
      }} 
      />

      <Stack.Screen
        name='movieDetail'
        component={MovieDetails}
        options={{
          headerShown:false,
          title:'Details'
        }}
      
      />
      
    </Stack.Navigator>
  );
}