import { Routes } from "@angular/router";
import { KitRoomReleasedComponent } from "./kit-room-released/kit-room-released.component";

//Guards
import { AuthenticationGuard } from "../../Guards/authentication.guard";
import { TestComponent } from "./test/test.component";


export const ProccessRouterModule: Routes = [
    {
        path: '',
        children: [
            {
                path: 'Kit',
                component: KitRoomReleasedComponent,
                canActivate: [AuthenticationGuard]
            },
            {
                path: 'Test',
                component: TestComponent,
                canActivate: [AuthenticationGuard]
            }
        ]
    }
]
