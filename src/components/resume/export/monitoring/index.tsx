import React, { Suspense } from 'react';
import { MainDashboard } from './dashboard/MainDashboard';
import { ErrorBoundary } from './errors/ErrorBoundary';
import { LoadingSpinner } from './common/LoadingSpinner';

const MonitoringSystem = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <MainDashboard />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MonitoringSystem;
