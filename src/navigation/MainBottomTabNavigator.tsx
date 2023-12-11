import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import FavouritesStackNavigator from './FavouritesStackNavigator';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faStar} from '@fortawesome/free-solid-svg-icons/faStar';

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faHouse}
              color={focused ? '#000' : '#999'}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faStar}
              color={focused ? '#000' : '#999'}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
