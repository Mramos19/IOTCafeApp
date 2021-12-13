
import { Routes } from "@angular/router";
import { AuthenticationGuard } from "../../Guards/authentication.guard";

//component
import { DashboardComponent } from './dashboard/dashboard.component';

export const ReportRoutesModule: Routes = [
    {
        path: '',
        children: [
            {
                path: 'Dashboard',
                component: DashboardComponent,
                canActivate:[AuthenticationGuard]
            }
        ]
    }
]