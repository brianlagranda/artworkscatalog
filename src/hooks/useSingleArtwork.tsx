import {useEffect, useState} from 'react';

const useSingleArtwork = (id: number) => {
  const [artwork, setArtwork] = useState(null);

  const fetchSingleArtwork = async () => {
    const APIurl = `https://api.artic.edu/api/v1/artworks/${id}?fields=id,title,thumbnail,date_display,artist_display,place_of_origin,description,dimensions,medium_display,artist_title,image_id`;

    try {
      const response = await globalThis.fetch(APIurl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const json = await response.json();

      setArtwork(json);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  useEffect(() => {
    fetchSingleArtwork();
  });

  return {artwork};
};

export default useSingleArtwork;
