import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailedScreen from '../components/DetailedArtwork';

type HomeStackParamList = {
  Catalog: undefined;
  Detailed: {id: number};
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Catalog">
      <Stack.Screen
        name="Catalog"
        component={HomeScreen}
        options={{title: 'Artworks Catalog'}}
      />
      <Stack.Screen
        name="Detailed"
        component={DetailedScreen}
        options={{title: 'Detailed Artwork'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
