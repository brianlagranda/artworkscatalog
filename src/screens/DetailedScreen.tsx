import React from 'react';
import DetailedArtwork from '../components/DetailedArtwork';

type DetailedScreenProps = {
  route: {
    params: {
      id: number;
    };
  };
};

const DetailedScreen: React.FC<DetailedScreenProps> = ({
  route,
}: DetailedScreenProps) => {
  const {id} = route.params;

  return <DetailedArtwork id={id} />;
};

export default DetailedScreen;
