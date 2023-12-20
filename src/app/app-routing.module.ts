import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { SecureInnerPageGuard } from "./core/guard/secure-inner-page.guard";

const routes: Routes = [
 {path:'login',component: LoginComponent, canActivate: [SecureInnerPageGuard]},
 { path: '', redirectTo: 'login', pathMatch: 'full' },
 {path: 'forgot',component: ForgotPasswordComponent},
 {path: 'sign-up', component: SignUpComponent, canActivate: [SecureInnerPageGuard]},
 {path: 'auth', loadChildren: () => import('./components/master-page/master-page.module').then(m =>m.MasterPageModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
