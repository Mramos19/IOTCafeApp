import { Routes } from "@angular/router";
import { KitRoomReleasedComponent } from "./kit-room-released/kit-room-released.component";

//Guards
import { AuthenticationGuard } from "../../Guards/authentication.guard";


export const ProccessRouterModule: Routes = [
    {
        path: '',
        children: [
            {
                path: 'Kit',
                component: KitRoomReleasedComponent,
                canActivate: [AuthenticationGuard]
            }
        ]
    }
]
