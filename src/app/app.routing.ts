import { Routes } from '@angular/router';
//Layouts
import {
  BlankComponent,
  SimplyWhiteLayout
} from './@pages/layouts';
import { AuthenticationGuard } from './Guards/authentication.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'Home', 
    data: {
      breadcrumb: 'Inicio'
    },
    component: SimplyWhiteLayout,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'Authentication',
    component: BlankComponent,
    loadChildren: './Layout/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'Proccess',
    component: SimplyWhiteLayout,
    loadChildren: './Layout/Proccess/proccess.module#ProccessModule'
  },
  {
    path: 'Report',
    component: SimplyWhiteLayout,
    loadChildren: './Layout/Report/report.module#ReportModule'
  }
];
