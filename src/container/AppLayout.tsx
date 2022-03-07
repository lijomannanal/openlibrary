import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '../components/Header';
import ErrorHandler from '../components/ErrorHandler';
import { routes, IRoutes } from '../routes';
import './style.scss';

const AppLayout = () => (
  <>
    <Header />
    <div className="app-page">
      <ErrorBoundary FallbackComponent={ErrorHandler}>
        <Routes>
          {
            routes.map(({ path, component: Component }: IRoutes) => (
              <Route path={path} element={<Component />} key={path} />
            ))
          }

        </Routes>
      </ErrorBoundary>
    </div>
  </>
);

export default AppLayout;
