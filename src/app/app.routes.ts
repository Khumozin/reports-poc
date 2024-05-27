import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/reports').then((r) => r.REPORTS_ROUTES),
  },
];
