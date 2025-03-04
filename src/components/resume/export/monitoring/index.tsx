import React, { Suspense } from 'react';
import { MainDashboard } from './dashboard/MainDashboard';
import { ErrorBoundary } from './errors/ErrorBoundary';
import { LoadingSpinner } from './common/LoadingSpinner';
import { StateManager } from './state/StateManager';
import { DataManager } from './data/DataManager';
import './styles/global.css';

const MonitoringSystem = () => {
  React.useEffect(() => {
    StateManager.initialize();
    DataManager.initialize();
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <MainDashboard />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MonitoringSystem;