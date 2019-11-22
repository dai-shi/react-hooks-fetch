// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import React, { useState, useTransition, Suspense } from 'react';

import { Suspendable, createFetcher, useFetcher } from 'react-hooks-fetch';

import DisplayImage, { LoadingImage } from './DisplayImage';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const preloadImage = (url: string) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onload = resolve;
  image.onerror = reject;
  image.src = url;
});

type SubBreedListData = {
  message: string[];
};

export type BreedImageData = {
  url: string;
};

const subBreedListFetcher = createFetcher<
  SubBreedListData,
  string
>(async (breed) => {
  await sleep(500);
  return (await fetch(`https://dog.ceo/api/breed/${breed}/list`)).json();
});

const breedImageFetcher = createFetcher<
  BreedImageData,
  {
    breed: string;
    subBreed: string;
  }
>(async ({ breed, subBreed }) => {
  await sleep(3000 * Math.random());
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`);
  const url = (await response.json()).message;
  await preloadImage(url);
  return { url };
});

const breedImagesFetcher = createFetcher<
  Suspendable<BreedImageData>[],
  {
    breed: string;
    subBreeds: Suspendable<SubBreedListData>;
  },
  {
    breed: string;
    subBreeds: string[];
  }
>(async ({ breed, subBreeds }) => subBreeds.map(
  subBreed => breedImageFetcher.run({ breed, subBreed }),
), ({ breed, subBreeds }) => ({ breed, subBreeds: subBreeds.message }));

const combinedFetcher = createFetcher<
  {
    subBreeds: Suspendable<SubBreedListData>;
    breedImages: Suspendable<Suspendable<BreedImageData>[]>;
  },
  {
    breed: string;
  }
>(async ({ breed }) => {
  const subBreeds = subBreedListFetcher.run(breed);
  const breedImages = breedImagesFetcher.run({ breed, subBreeds });
  return {
    subBreeds,
    breedImages,
  };
});

const initialBreed = 'hound';
const initialSuspendable = combinedFetcher.run({ breed: initialBreed });

const Main: React.FC = () => {
  const [breed, setBreed] = useState(initialBreed);
  const result = useFetcher(combinedFetcher, initialSuspendable);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const onClick = () => {
    startTransition(() => {
      result.refetch({ breed });
    });
  };
  return (
    <div>
      <select value={breed} onChange={e => setBreed(e.target.value)}>
        <option value="hound">Hound</option>
        <option value="bulldog">Bulldog</option>
        <option value="mastiff">Mastiff</option>
        <option value="poodle">Poodle</option>
      </select>
      <button type="button" onClick={onClick}>Refresh</button>
      {isPending && <span>Pending...</span>}
      <h3>Number of sub breed</h3>
      {result.data.subBreeds.message.length}
      <h3>Images</h3>
      {result.data.breedImages.map(item => (
        <Suspense fallback={<LoadingImage />}>
          <DisplayImage item={item} />
        </Suspense>
      ))}
    </div>
  );
};

export default Main;
