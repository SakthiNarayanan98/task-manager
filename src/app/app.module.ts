import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginModule } from "./login/login.module";
import { SignUpModule } from "./sign-up/sign-up.module";
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MaterialModule } from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    TaskComponent,
    // ForgotPasswordComponent,
    // SignUpComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    SignUpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ForgotPasswordModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
