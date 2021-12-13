import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../@pages/components/shared.module";

//Components
import { KitRoomReleasedComponent } from './kit-room-released/kit-room-released.component';

//Routes
import { ProccessRouterModule } from "./proccess.routing";
import { TestComponent } from './test/test.component';

@NgModule({

    declarations: [
        KitRoomReleasedComponent,
        TestComponent
    ],
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        SharedModule, 
        RouterModule.forChild(ProccessRouterModule)
    ]
})

export class ProccessModule {

}