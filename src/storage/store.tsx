import AsyncStorage from '@react-native-async-storage/async-storage';

interface Artwork {
  id: number;
  description: string | null;
  image_id: string;
  title: string;
  iiif_url: string;
  favourite: boolean;
}

const storeData = async (artworks: Artwork[]) => {
  try {
    const jsonValue = JSON.stringify(artworks);

    await AsyncStorage.setItem('NewStoredArtworks', jsonValue);
  } catch (error) {
    console.error('Error storing local data:', error);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('NewStoredArtworks');
    return jsonValue !== null ? JSON.parse(jsonValue) : {};
  } catch (error) {
    console.error('Error getting artworks data:', error);
    return {};
  }
};

export {storeData, getData};
