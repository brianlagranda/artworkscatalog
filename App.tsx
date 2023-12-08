/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ArtworkList from './src/components/ArtworkList';
import DetailedScreen from './src/components/DetailedScreen';

type RootStackParamList = {
  Home: undefined;
  Detailed: {imageId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={ArtworkList}
          options={{title: 'Artworks Catalog'}}
        />
        <Stack.Screen
          name="Detailed"
          component={DetailedScreen}
          options={{title: 'Detailed Artwork'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
