import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import useArtworks from '../hooks/useArtworks';
import ArtworkItem from './ArtworkItem';

const ArtworkList = () => {
  const {artworks} = useArtworks();

  const artworksData = artworks?.data;
  const artworksConfig = artworks?.config;

  if (!artworksData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={artworksData}
        renderItem={({item: artwork}) => (
          <ArtworkItem {...artwork} {...artworksConfig} />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArtworkList;
