import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from "./profile.component";
import { MaterialModule } from "../../material/material.module";


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    RouterModule,
    MaterialModule
  ]
})
export class ProfileModule { }
