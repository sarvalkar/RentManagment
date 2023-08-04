import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonserviceService } from './services/commonservice.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit,OnChanges {
  isloggedIn$:any;
  lastEvent: any;
 // isLoggedOut = false;
  constructor(private commonService:CommonserviceService){
    this.isloggedIn$ = this.commonService.getLoggedInUser();

    this.isloggedIn$.subscribe((value: any) => {
      this.lastEvent = value;
     // this.isLoggedOut= value;
      console.log('last event',value);
      
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
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
