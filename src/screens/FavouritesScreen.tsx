import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArtworkItem from '../components/ArtworkItem';

interface Artwork {
  id: number;
  description: string | null;
  image_id: string;
  title: string;
  thumbnail: Thumbnail;
  iiif_url: string;
  favourite: boolean;
}

interface Thumbnail {
  lqip: string;
  width: number | null;
  height: number | null;
  alt_text: string;
}

const FavouriteScreen: React.FC = () => {
  const [favouriteArtworks, setFavouriteArtworks] = useState<Artwork[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const storedArtworks = await AsyncStorage.getItem('NewStoredArtworks');
      if (storedArtworks) {
        const artworks = Object.values(JSON.parse(storedArtworks));
        const updatedFavourites = artworks.filter(
          (artwork: Artwork) => artwork.favourite,
        );
        setFavouriteArtworks(updatedFavourites);
      }
    } catch (error) {
      console.error('Error getting artworks data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  });

  return (
    <View>
      <FlatList
        data={favouriteArtworks}
        renderItem={({item: artwork}) => <ArtworkItem {...artwork} />}
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

export default FavouriteScreen;
