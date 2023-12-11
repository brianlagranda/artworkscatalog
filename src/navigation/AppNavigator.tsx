import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainBottomTabNavigator from './MainBottomTabNavigator';

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <MainBottomTabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
