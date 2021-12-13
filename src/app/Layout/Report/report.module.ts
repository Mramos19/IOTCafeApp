import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../@pages/components/shared.module";

//Components
import { DashboardComponent } from './dashboard/dashboard.component';

//Rutas Hijas
import { ReportRoutesModule } from "./report.routing";


@NgModule({

    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        SharedModule, 
        RouterModule.forChild(ReportRoutesModule)
    ]

})

export class ReportModule {

}