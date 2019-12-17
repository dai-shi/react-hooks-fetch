// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import React, { useTransition } from 'react';

type Props = {
  id: string;
  result: {
    data: {
      first_name: string;
    };
  };
  refetch: (input: string) => void;
};

const DisplayData: React.FC<Props> = ({ id, result, refetch }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const onClick = () => {
    startTransition(() => {
      refetch(id);
    });
  };
  return (
    <div>
      <div>First Name: {result.data.first_name}</div>
      <button type="button" onClick={onClick}>Refetch</button>
      {isPending && 'Pending...'}
    </div>
  );
};

export default DisplayData;
