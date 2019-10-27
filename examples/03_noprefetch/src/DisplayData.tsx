// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import React, { useTransition } from 'react';

type Props = {
  id: string;
  result: {
    data: {
      data: {
        first_name: string;
      };
    };
    refetch: (input: string) => void;
  };
};

const DisplayData: React.FC<Props> = ({ id, result }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const refetch = () => {
    startTransition(() => {
      result.refetch(id);
    });
  };
  return (
    <div>
      <div>First Name: {result.data.data.first_name}</div>
      <button type="button" onClick={refetch}>Refetch</button>
      {isPending && 'Pending...'}
    </div>
  );
};

export default DisplayData;
