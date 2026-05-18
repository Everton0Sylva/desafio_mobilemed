import { Routes } from '@angular/router';
export const exameRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list').then((c) => c.List),
  },
  {
    path: 'novo',
    loadComponent: () => import('./form/form').then((c) => c.Form)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./form/form').then((c) => c.Form),
  }
];
