import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import wsService from './services/websocket';
import Dashboard from './components/Dashboard';
import AuthForms from './components/auth/AuthForms';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  // Only try to connect WebSocket in production
  useEffect(() => {
    if (isAuthenticated && !import.meta.env.DEV) {
      wsService.connect();
      return () => wsService.disconnect();
    }
  }, [isAuthenticated]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/login" element={<AuthForms />} />
            <Route
              path="/dashboard/*"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;