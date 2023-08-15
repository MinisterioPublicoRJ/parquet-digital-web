import React from 'react';

import DashboardView from './Dashboard.view';
import AppErrorView from '../app/AppError.view';
import DashboardControler from '../../../core/dashboard/Dashboard.controler';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
import { useAppContext } from '../../../core/app/App.context';


function Dashboard() {
  const { currentOffice } = useAppContext(); 

  return (
    <DashboardControler errorBoundary={ErrorBoundary} errorScreen={AppErrorView} key={currentOffice?.codigo}>
      <DashboardView />
    </DashboardControler>
  )
}

export default Dashboard;
