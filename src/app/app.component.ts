import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonserviceService } from './services/commonservice.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  isloggedIn$:any;
  lastEvent: any;
  constructor(private commonService:CommonserviceService){
    this.isloggedIn$ = this.commonService.getLoggedInUser();

    this.isloggedIn$.subscribe((value: any) => {
      this.lastEvent = value;
    });
  }
  ngAfterViewInit() {
   
  }
  ngOnInit() {
    
  }
  title = 'RentManagment';
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
