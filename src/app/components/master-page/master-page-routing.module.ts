import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPageComponent } from "./master-page.component";
import { AuthGuard } from "../../core/guard/auth.guard";



const routes: Routes = [
  {
    path: 'auth',
    component: MasterPageComponent,
    children: [
      // { path: 'login', component: LoginComponent },
      // { path: 'forgot', component: ForgotPasswordComponent },
      // { path: 'sign-up', component: SignUpComponent },
      { path: 'task', loadChildren: () => import('../task/task.module').then((m) => m.TaskModule)},
      {path:'profile', loadChildren: ()=> import('../profile/profile.module').then((m)=> m.ProfileModule)},
      {path: 'dashboard',loadChildren: ()=> import('../dashboard/dashboard.module').then((m)=> m.DashboardModule),canActivate: [AuthGuard]},
      
     
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterPageRoutingModule { }
