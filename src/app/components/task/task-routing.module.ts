import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from "./task.component";

const routes: Routes = [
  {path: '',component: TaskComponent}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
    CommonModule,
  ]
  
})
export class TaskRoutingModule { }
