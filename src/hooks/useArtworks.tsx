import {useEffect, useState} from 'react';

const APIurl =
  'https://api.artic.edu/api/v1/artworks?fields=id,title,thumbnail,date_display,artist_display,place_of_origin,description,dimensions,medium_display,artist_title,image_id';

const useArtworks = () => {
  const [artworks, setArtworks] = useState({});

  const fetchArtworks = async () => {
    try {
      const response = await globalThis.fetch(APIurl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();

      setArtworks(json);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return {artworks};
};

export default useArtworks;
