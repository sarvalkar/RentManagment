import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }
   buildingList:any;
   flatList:any;
   renterList:any;

  ngOnInit(): void { // Fetching data from json server to show count in dashboard
      this.http.get('http://localhost:3000/buildingList/').subscribe(res => {     
      this.buildingList = res;
    })
    this.http.get('http://localhost:3000/flatList/').subscribe(res1 => {     
      this.flatList = res1;
    })
    this.http.get('http://localhost:3000/renterList/').subscribe(res2 => {     
      this.renterList = res2;
    })
  }
}
