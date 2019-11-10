import React from 'react';

import { Suspendable } from 'react-hooks-fetch';

import { UserData } from './UserPage.data';

type Props = {
  user: Suspendable<UserData>;
};

const UserPage: React.FC<Props> = ({ user }) => (
  <div>
    <div>User ID: {user.data.id}</div>
    <div>First Name: {user.data.first_name}</div>
  </div>
);

export default UserPage;
