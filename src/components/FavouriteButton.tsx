import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons/faHeart';

interface Artwork {
  id: number;
  description: string | null;
  image_id: string;
  title: string;
  iiif_url: string;
  favourite?: boolean;
}

const FavouriteButton: React.FC<Artwork> = props => {
  const {favourite, ...artwork} = props;
  const [isFavourite, setFavourite] = useState<boolean | undefined>(favourite);

  const storeData = async (updatedArtwork: Artwork) => {
    try {
      const storedArtworks = await getData();
      const updatedStoredArtworks = {
        ...storedArtworks,
        [updatedArtwork.id]: {...updatedArtwork, favourite: isFavourite},
      };

      const jsonValue = JSON.stringify(updatedStoredArtworks);
      await AsyncStorage.setItem('storedArtworks', jsonValue);
    } catch (error) {
      console.error('Error storing artworks data:', error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('storedArtworks');
      return jsonValue !== null ? JSON.parse(jsonValue) : {};
    } catch (error) {
      console.error('Error getting artworks data:', error);
      return {};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedArtworks = await getData();
      const artworkData = storedArtworks[artwork.id];

      if (artworkData) {
        setFavourite(artworkData.favourite);
      }
    };

    fetchData();
  }, [artwork.id]);

  const handleClick = async () => {
    setFavourite(!isFavourite);
    await storeData(artwork);
  };

  return (
    <View style={styles.favouriteIcon}>
      <TouchableOpacity onPress={handleClick}>
        <FontAwesomeIcon
          icon={isFavourite ? faHeartSolid : faHeartRegular}
          style={styles.icon}
          size={32}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: 'red',
  },
  favouriteIcon: {
    width: '100%',
    alignItems: 'flex-end',
  },
});

export default FavouriteButton;
