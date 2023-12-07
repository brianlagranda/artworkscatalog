import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

let helpers = require('../helpers/func');

type ItemProps = {
  id: number;
  description: string | null;
  image_id: string;
  title: string;
  thumbnail: Thumbnail;
  iiif_url: string;
};

interface Thumbnail {
  lqip: string;
  width: number | null;
  height: number | null;
  alt_text: string;
}

const ArtworkItem: React.FC<ItemProps> = ({
  id,
  description,
  image_id,
  title,
  thumbnail,
  iiif_url,
}) => {
  const hasImage = image_id !== null;

  if (!hasImage) {
    return null;
  }

  return (
    <View style={styles.artworkContainer} key={id}>
      <Image
        style={styles.thumbnail}
        source={{
          uri: `${iiif_url}/${image_id}/full/200,/0/default.jpg`,
        }}
      />
      <Text style={styles.text}>
        {description === null
          ? title.startsWith('Untitled', 0)
            ? thumbnail.alt_text
            : title
          : helpers.extractShortDescription(description)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  artworkContainer: {
    width: 350,
    padding: 40,
    gap: 10,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  text: {
    color: '#000',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    maxWidth: 350,
  },
  thumbnail: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default ArtworkItem;
