import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

let helpers = require('../helpers/func');

const fetchDetailsById = async (id: number): Promise<any> => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=image_id,title,description,artist_title,dimensions,place_of_origin,date_display`,
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

      <Text style={styles.relevantInfo}>Artist</Text>
      <Text style={styles.relevantInfoContent}>
        {artworksData.artist_title}
      </Text>

      <View style={styles.separator} />

      <Text style={styles.relevantInfo}>Dimensions</Text>
      <Text style={styles.relevantInfoContent}>
        {artworksData.dimensions === null
          ? 'Not specified'
          : artworksData.dimensions}
      </Text>

      <View style={styles.separator} />

      <Text style={styles.relevantInfo}>Origin</Text>
      <Text style={styles.relevantInfoContent}>
        {artworksData.place_of_origin === null
          ? 'Not specified'
          : artworksData.place_of_origin}
      </Text>

      <View style={styles.separator} />

      <Text style={styles.relevantInfo}>Date </Text>
      <Text style={styles.relevantInfoContent}>
        Made {artworksData.date_display}
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
    paddingBottom: 50,
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
    fontSize: 18,
    width: '100%',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  relevantInfoContent: {
    color: '#777',
    fontSize: 16,
    width: '100%',
    fontWeight: 'normal',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailedImage: {
    width: '100%',
    height: 700,
    resizeMode: 'contain',
  },
  separator: {
    width: '95%',
    borderColor: '#999',
    borderWidth: 0.5,
  },
});

export default DetailedScreen;
