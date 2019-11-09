// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import React, { useState, useTransition, Suspense } from 'react';

import { Suspendable, createFetcher, useSuspendable } from 'react-hooks-fetch';

import DisplayImage, { LoadingImage } from './DisplayImage';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

type SubBreedListData = {
  message: string[];
};

export type BreedImageData = {
  message: string;
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
  return (await fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`)).json();
});

const breedImagesFetcher = createFetcher<
  Suspendable<BreedImageData>[],
  {
    breed: string;
    subBreeds: Suspendable<SubBreedListData>;
  }
>(async ({ breed, subBreeds }) => subBreeds.data.message.map(
  subBreed => breedImageFetcher.prefetch({ breed, subBreed }),
));

const combinedFetcher = createFetcher<
  {
    subBreeds: Suspendable<SubBreedListData>;
    breedImages: Suspendable<Suspendable<BreedImageData>[]>;
  },
  {
    breed: string;
  }
>(async ({ breed }) => {
  const subBreeds = subBreedListFetcher.prefetch(breed);
  const breedImages = breedImagesFetcher.prefetch({ breed, subBreeds });
  return {
    subBreeds,
    breedImages,
  };
});

const initialBreed = 'hound';
const initialSuspendable = combinedFetcher.prefetch({ breed: initialBreed });

const Main: React.FC = () => {
  const [breed, setBreed] = useState(initialBreed);
  const suspendable = useSuspendable(initialSuspendable);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const onClick = () => {
    startTransition(() => {
      suspendable.refetch({ breed });
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
      {suspendable.data.subBreeds.data.message.length}
      <h3>Images</h3>
      {suspendable.data.breedImages.data.map(item => (
        <Suspense fallback={<LoadingImage />}>
          <DisplayImage item={item} />
        </Suspense>
      ))}
    </div>
  );
};

export default Main;
