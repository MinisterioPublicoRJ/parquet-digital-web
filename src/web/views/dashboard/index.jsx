import React from 'react';

import DashboardView from './Dashboard.view.jsx';
import AppErrorView from '../app/AppError.view';
import DashboardControler from '../../../core/dashboard/Dashboard.controler';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';
// import { useDashboardContext } from '../../../core/Dashboard/Dashboard.context';

function Dashboard() {
  return (
    <DashboardControler errorBoundary={ErrorBoundary} errorScreen={AppErrorView}>
      <DashboardView />
    </DashboardControler>
  )
}

export default Dashboard;
