import React, { Dispatch } from 'react';

import { Action } from './List';

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
  dispatch: Dispatch<Action>;
};

const DisplayData: React.FC<Props> = ({ id, result, dispatch }) => (
  <div>
    <span>First Name: {result.data.data.first_name}</span>
    <button type="button" onClick={() => dispatch({ type: 'DEL', id })}>Delte</button>
  </div>
);

export default DisplayData;
