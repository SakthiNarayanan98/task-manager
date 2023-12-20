import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from "./task-routing.module";
import { TaskComponent } from "./task.component";
import { MaterialModule } from "../../material/material.module";
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
    MatDialogModule
    
  ]
})


export class TaskModule { }
