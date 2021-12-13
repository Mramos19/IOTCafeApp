import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";


export const AuthenticationRoutes: Routes = [

    {
        path: '',
        children:[
            {
                path: 'Login',
                component: LoginComponent
            },
            {
                path: '',
                redirectTo: '/Authentication/Login',
                pathMatch: 'full'
            }
        ]
    }

];