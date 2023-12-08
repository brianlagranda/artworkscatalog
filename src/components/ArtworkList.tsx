import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import useArtworks from '../hooks/useArtworks';
import ArtworkItem from './ArtworkItem';

const ArtworkList: React.FC = () => {
  const {artworks} = useArtworks();

  const artworksData = artworks?.data;
  const artworksConfig = artworks?.config;

  return (
    <FlatList
      data={artworksData}
      renderItem={({item: artwork}) => {
        return <ArtworkItem {...artwork} {...artworksConfig} />;
      }}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.flatListContainer}
    />
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
});

export default ArtworkList;
