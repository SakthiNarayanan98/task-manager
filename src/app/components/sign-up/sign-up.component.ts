import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  implements OnInit{

  constructor(public authservice: AuthenticationService) {}

  ngOnInit(): void {
    
  }

}
