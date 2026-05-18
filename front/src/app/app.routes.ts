import { Routes } from '@angular/router';
import { Home } from './layout/home/home';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/home/home').then((c) => c.Home),
    children: [
      {
        path: 'paciente',
        loadChildren: () => import('./features/paciente/paciente.routes').then((c) => c.pacienteRoutes),
      }
    ]
  },
];
