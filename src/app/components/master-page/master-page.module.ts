import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../material/material.module";
import { MasterPageRoutingModule } from './master-page-routing.module';
import { MasterPageComponent } from "./master-page.component";
import { ProfileModule } from "../profile/profile.module";
import { HeaderModule } from "../../core/header/header.module";
import { FooterModule } from "../../core/footer/footer.module";
import { SidebarModule } from "../../core/sidebar/sidebar.module";



@NgModule({
  declarations: [MasterPageComponent],
  imports: [
    CommonModule,
    MasterPageRoutingModule,
    MaterialModule,
    ProfileModule,
    HeaderModule,
    FooterModule,
    SidebarModule
  ]
})
export class MasterPageModule { }
