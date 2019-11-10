import React, { Dispatch } from 'react';

import { Action } from './List';

type Props = {
  id: string;
  result: {
    data: {
      first_name: string;
    };
  };
  dispatch: Dispatch<Action>;
};

const DisplayData: React.FC<Props> = ({ id, result, dispatch }) => (
  <div>
    <span>First Name: {result.data.first_name}</span>
    <button type="button" onClick={() => dispatch({ type: 'DEL', id })}>Delte</button>
  </div>
);

export default DisplayData;
