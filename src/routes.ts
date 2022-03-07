import React from 'react';
import Home from './components/Home/Home';

export interface IRoutes {
  path: string,
  component: React.FunctionComponent,
}

export const routes: IRoutes[] = [
  { path: '/', component: Home },
];
