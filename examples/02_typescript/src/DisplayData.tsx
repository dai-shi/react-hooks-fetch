// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import React, { useTransition } from 'react';

type Props = {
  id: string;
  resource: {
    data: {
      data: {
        first_name: string;
      };
    };
    refetch: (input: string) => void;
  };
};

const DisplayData: React.FC<Props> = ({ id, resource }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const refetch = () => {
    startTransition(() => {
      resource.refetch(`https://reqres.in/api/users/${id}?delay=3`);
    });
  };
  return (
    <div>
      <div>First Name: {resource.data.data.first_name}</div>
      <button type="button" onClick={refetch}>Refetch</button>
      {isPending && 'Pending...'}
    </div>
  );
};

export default DisplayData;
