import { Component,OnInit } from '@angular/core';
import { MaterialModule } from "../material.module";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  passwordType: string = 'password';
  showPassword!: boolean;
hide: any;


  ngOnInit(): void {
    

}

toggleShow() {
  this.showPassword = !this.showPassword;
}


}
