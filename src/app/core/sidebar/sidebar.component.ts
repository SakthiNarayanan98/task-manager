import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  clickCount = 0;

  constructor( public authservice: AuthenticationService) {}

  ngOnInit(): void {
      console.log('sidebar');
      
  }



  handleSidebarItemClick() {
    this.clickCount++;
    console.log(`Sidebar item clicked ${this.clickCount} times.`);
  }
  sakthi = 'sakthi'

}
