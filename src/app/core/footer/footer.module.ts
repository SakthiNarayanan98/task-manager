import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../material/material.module";
import { FooterComponent } from "../footer/footer.component";



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
