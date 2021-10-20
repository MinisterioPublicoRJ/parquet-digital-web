import React, { useState, useEffect } from 'react';

import { useAppContext } from '../../../core/app/App.context';

const Dashboard = () => {
  const { user } = useAppContext();

  return (
    <div>hi {user}</div>
  ); 
};

export default Dashboard;
