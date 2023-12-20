import { Component,OnInit } from '@angular/core';
import { MaterialModule } from "../../material/material.module";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "../../core/services/authentication.service";
import { HotToastService } from "@ngneat/hot-toast";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup

  constructor(
    private router: Router,
    private toastr:ToastrService,
    private fb: FormBuilder,
    public authService: AuthenticationService,
    private toast: HotToastService

    ) {}
  
  hide = true;

  passwordType: string = 'password';
  showPassword!: boolean;


  ngOnInit(): void {
    this.loginform();
}

loginform() {
  this.loginForm = this.fb.group({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    userName: new FormControl('',[Validators.required])
  })
}

get email() {
  return this.loginForm.get('email');
}

get password() {
  return this.loginForm.get('password');
}

// login() {
//   if (this.loginForm.invalid) {
//     return;
//   }

//   const { email, password } = this.loginForm.value;
//   this.authService.login(email, password).pipe(
//     this.toast.observe({
//       success: 'Logged in successfully',
//       loading: 'Logging in...',
//       error: 'There was an error'
//     })
//   ).subscribe(() => {
//     this.router.navigate(['/login']);
//   });
// }


// login() {
//   this.toastr.success('Log In Successfull.');
//   console.log('sakthi');
  
//   this.router.navigate(['/auth/dashboard'])
//   // Toggle the sidebar after successful login

// }
navigateToForgot() {
  this.router.navigate(['/forgot']);
}

navigateToSignUp() {
  this.router.navigate(['/sign-up']);
}

togglePassword(passwordInput: HTMLInputElement):void {
  this.hide = !this.hide;
  passwordInput.type = this.hide ? 'password': 'text';
}

}



