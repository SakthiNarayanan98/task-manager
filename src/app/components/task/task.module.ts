import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from "./task-routing.module";
import { TaskComponent } from "./task.component";
import { MaterialModule } from "../../material/material.module";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from "../../core/services/data.service";
import { MatTableModule } from '@angular/material/table';







@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    HttpClientModule,
    MatTableModule
    
  ],
  exports: [TaskComponent],
  providers: [DataService]
})


export class TaskModule { }
