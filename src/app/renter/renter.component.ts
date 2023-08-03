import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogforRenterComponent } from '../dialogfor-renter/dialogfor-renter.component';
import {  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.scss']
})
export class RenterComponent implements OnInit {

  displayedColumns: string[] = ['renterName', 'buildingName', 'floorNumber', 'flatName', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private api:ApiService) { }

  ngOnInit(): void {
    this.getAllRenterList();
  }


  addRenter(){  // To add new renter information
    this.dialog.open(DialogforRenterComponent, {
      width:'30%'
     }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllRenterList()
      }
    })
  }


  editRenter(row:any){ // Edit rnter table row
    this.dialog.open(DialogforRenterComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllRenterList()
      }
    })
  }

  deleteRenter(renterName:string){ // Delete table row
    this.api.deleteRenter(renterName)
    .subscribe({
      next:(res)=>{
        alert("Building Details Deleted..")
        this.getAllRenterList()
      },
      error:(err)=>{
        alert("Error while Deleting")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllRenterList(){
    this.api.getRenter()
    .subscribe({
      next:(res:any)=>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while fetching data")
      }
    })
  }
}
