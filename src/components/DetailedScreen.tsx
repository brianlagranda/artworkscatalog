import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import useSingleArtwork from '../hooks/useSingleArtwork';

type RootStackParamList = {
  Home: undefined;
  Detailed: {id: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Detailed'>;

let helpers = require('../helpers/func');

const DetailedScreen = ({route}: Props) => {
  const {id} = route.params;
  const {artwork} = useSingleArtwork(id);

  const artworkData = artwork?.data;
  const artworkConfig = artwork?.config;

  if (!artwork) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.artworkContainer}>
      <Image
        style={styles.detailedImage}
        source={{
          uri: `${artworkConfig.iiif_url}/${artworkData.image_id}/full/843,/0/default.jpg`,
        }}
      />
      <Text style={styles.title}>{artworkData.title}</Text>
      <Text style={styles.description}>
        {artworkData.description === null
          ? ''
          : helpers.extractHtmlTags(artworkData.description)}
      </Text>

      <Text style={styles.relevantInfo}>Artist</Text>
      <Text style={styles.relevantInfoContent}>
        {artworkData.artist_title === null
          ? 'Not specified'
          : artworkData.artist_title}
      </Text>

      <View style={styles.separator} />

      <Text style={styles.relevantInfo}>Dimensions</Text>
      <Text style={styles.relevantInfoContent}>
        {artworkData.dimensions === null
          ? 'Not specified'
          : artworkData.dimensions}
      </Text>

      <View style={styles.separator} />

      <Text style={styles.relevantInfo}>Origin</Text>
      <Text style={styles.relevantInfoContent}>
        {artworkData.place_of_origin === null
          ? 'Not specified'
          : artworkData.place_of_origin}
      </Text>

      <View style={styles.separator} />

      <Text style={styles.relevantInfo}>Date </Text>
      <Text style={styles.relevantInfoContent}>
        Made {artworkData.date_display}
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
  loading: {
    width: '100%',
    height: '100%',
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default DetailedScreen;
