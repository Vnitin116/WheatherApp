import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Splash from './src/Screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {StackNav} from './src/Navigation/StackNav';

const App = () => {
  return (
    <NavigationContainer>
     <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
     <StackNav />
    </NavigationContainer>
  );
};

export default App;
