import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  constructor( public authservice: AuthenticationService) {console.log();}

  ngOnInit(): void {
   // Inside ForgotPasswordComponent constructor


  }

}
