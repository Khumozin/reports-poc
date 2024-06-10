import { Routes } from '@angular/router';

import {
  MainPageComponent,
  MonthPageComponent,
  YearPageComponent,
} from './pages';

export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'month-report',
        component: MonthPageComponent,
      },
      {
        path: 'year-report',
        component: YearPageComponent,
      },
      {
        path: '**',
        redirectTo: 'month-report',
        pathMatch: 'full',
      },
    ],
  },
];
