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

const DisplayData = ({ id, result, refetch }: Props) => {
  const [isPending, startTransition] = useTransition();
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
