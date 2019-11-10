import React from 'react';

import { Suspendable } from 'react-hooks-fetch';

import { BreedImageData } from './Main';

type Props = {
  item: Suspendable<BreedImageData>;
};

const imageStyle = {
  width: 90,
  height: 90,
  border: '3px solid #aaa',
  margin: 5,
};

export const LoadingImage: React.FC = () => {
  const style = {
    ...imageStyle,
    display: 'inline-block',
    backgroundColor: '#ddd',
  };
  return <div style={style} />;
};

const DisplayImage: React.FC<Props> = ({ item }) => (
  <span>
    <img
      alt="breedImage"
      src={item.message}
      style={imageStyle}
    />
  </span>
);

export default DisplayImage;
