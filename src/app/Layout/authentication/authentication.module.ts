
//Angular Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


//Custom Modules
import { SharedModule } from "../../@pages/components/shared.module";

//Message Service
import { MessageModule } from '../../@pages/components/message/message.module';

//Routes
import { AuthenticationRoutes } from "./authentication.routing";

//Components
import { LoginComponent } from "./login/login.component";


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MessageModule,
        RouterModule.forChild(AuthenticationRoutes)
    ]
})

export class AuthenticationModule {

}