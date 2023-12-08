import React, {useState, useEffect} from 'react';
import {ScrollView, Text, Image, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

let helpers = require('../helpers/func');

const fetchDetailsById = async (id: number): Promise<any> => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=image_id,title,description,artist_title,dimensions`,
  );
  const data = await response.json();
  return data;
};

type RootStackParamList = {
  Home: undefined;
  Detailed: {id: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Detailed'>;

const DetailedScreen = ({route}: Props) => {
  const [artworks, setArtworks] = useState<any>();

  const artworksData = artworks?.data;
  const artworksConfig = artworks?.config;

  useEffect(() => {
    const fetchDetail = async () => {
      const {id} = route.params;
      console.log('ID:', id);
      const response = await fetchDetailsById(id);
      setArtworks(response);
    };

    fetchDetail();
  }, []);

  if (!artworks) {
    return <Text>Loading...</Text>;
  }

  console.log(artworksData.description);

  return (
    <ScrollView contentContainerStyle={styles.artworkContainer}>
      <Image
        style={styles.detailedImage}
        source={{
          uri: `${artworksConfig.iiif_url}/${artworksData.image_id}/full/843,/0/default.jpg`,
        }}
      />
      <Text style={styles.title}>{artworksData.title}</Text>
      <Text style={styles.description}>
        {artworksData.description === null
          ? ''
          : helpers.extractHtmlTags(artworksData.description)}
      </Text>
      <Text style={styles.description}>
        Artist: {artworksData.artist_title}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  artworkContainer: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    color: '#000',
    fontSize: 18,
    width: '100%',
    padding: 5,
  },
  title: {
    color: '#000',
    fontSize: 24,
    width: '100%',
    paddingBottom: 40,
    textAlign: 'center',
  },
  relevantInfo: {
    color: '#000',
    fontSize: 24,
    width: '100%',
    paddingBottom: 40,
    textAlign: 'center',
  },
  detailedImage: {
    width: '100%',
    height: 700,
    resizeMode: 'contain',
  },
});

export default DetailedScreen;
