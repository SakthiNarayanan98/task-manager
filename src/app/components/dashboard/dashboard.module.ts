import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from "../../material/material.module";
import { NgChartsModule } from 'ng2-charts'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaterialModule,
        NgxChartsModule,
        NgChartsModule,
        FormsModule,
    ],
    exports: [DashboardComponent]

})
export class DashboardModule { }
