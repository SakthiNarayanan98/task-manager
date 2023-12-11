import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "../app/login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path:'sakthi',

    component: LoginComponent,

    children: [
      { path: 'login',
       loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: 'sign-up',
       loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) },
      {path: 'forgot-password',
      loadChildren: () => import('./forgot-password/forgot-password.module').then(m =>m.ForgotPasswordModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
