import { HotToastModule } from '@ngneat/hot-toast';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from "./components/login/login.module";
import { SignUpModule } from "./components/sign-up/sign-up.module";
import { ForgotPasswordModule } from "./components/forgot-password/forgot-password.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { TaskModule } from "./components/task/task.module";
import { MasterPageModule } from "../app/components/master-page/master-page.module";
import { HeaderModule } from "../app/core/header/header.module";
import { FooterModule } from "../app/core/footer/footer.module";
import { SidebarModule } from "../app/core/sidebar/sidebar.module";
import { MasterPageRoutingModule } from "../app/components/master-page/master-page-routing.module";
import { DashboardModule } from "../app/components/dashboard/dashboard.module";
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../src/environments/environment';
import { AuthenticationService } from "../app/core/services/authentication.service";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    LoginModule,
    SignUpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ForgotPasswordModule,
    MaterialModule,
    TaskModule,
    MasterPageModule,
    HeaderModule,
    FooterModule,
    SidebarModule,
    MasterPageRoutingModule,
    DashboardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
    
    
    
    
    
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
