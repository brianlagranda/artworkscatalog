/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import ArtworkList from './src/components/ArtworkList';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ArtworkList />
    </SafeAreaView>
  );
}

export default App;
