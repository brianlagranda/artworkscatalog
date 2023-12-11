import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FavouritesScreen from '../screens/FavouritesScreen';

type FavouritesStackParamList = {
  Favs: undefined;
};

const Stack = createNativeStackNavigator<FavouritesStackParamList>();

const FavouritesStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Favs">
      <Stack.Screen
        name="Favs"
        component={FavouritesScreen}
        options={{title: 'Favourites'}}
      />
    </Stack.Navigator>
  );
};

export default FavouritesStackNavigator;
