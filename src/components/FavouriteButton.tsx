import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from '../storage/store';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faHeart as faHeartRegular} from '@fortawesome/free-regular-svg-icons/faHeart';

type Artwork = {
  id: number;
  description: string | null;
  image_id: string;
  title: string;
  thumbnail: Thumbnail;
  iiif_url: string;
  favourite: boolean;
};

interface Thumbnail {
  lqip: string;
  width: number | null;
  height: number | null;
  alt_text: string;
}

const FavouriteButton: React.FC<Artwork> = props => {
  const {...artwork} = props;
  const [isFavourite, setFavourite] = useState<boolean>(false);

  const storeData = async (updatedArtwork: Artwork) => {
    try {
      const storedArtworks = await getData();
      const updatedStoredArtworks = {
        ...storedArtworks,
        [updatedArtwork.id]: {...updatedArtwork},
      };

      const jsonValue = JSON.stringify(updatedStoredArtworks);
      await AsyncStorage.setItem('NewStoredArtworks', jsonValue);
    } catch (error) {
      console.error('Error storing artworks data:', error);
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
  }, [artwork.favourite]);

  const handleClick = async () => {
    const updatedIsFavourite = !isFavourite;
    setFavourite(updatedIsFavourite);
    const updatedArtwork = {...artwork, favourite: updatedIsFavourite};
    await storeData(updatedArtwork);
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
