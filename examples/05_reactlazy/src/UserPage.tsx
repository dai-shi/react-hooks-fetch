import React from 'react';

import { Suspendable } from 'react-hooks-fetch';

import { UserData } from './UserPage.data';

type Props = {
  user: Suspendable<UserData, string>;
};

const UserPage: React.FC<Props> = ({ user }) => (
  <div>
    <div>User ID: {user.data.data.id}</div>
    <div>First Name: {user.data.data.first_name}</div>
  </div>
);

export default UserPage;
