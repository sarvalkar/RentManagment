import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Flat, } from '../model';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  displayedColumns: string[] = ['buildingName', 'floorNumber', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api:ApiService ) { }

  ngOnInit(): void {
    this.getAllBuldingList();
  }

  applyFilter(event: Event) { // Material  Function For table filter
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editBuilding(row:any){ // Edit function for edit table row
    this.dialog.open(DialogComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllBuldingList()
      }
    })
  }
// For deleteing the row
  deleteBuildings(id:number){
    this.api.deleteBuilding(id)
    .subscribe({
      next:(res)=>{
        alert("Building Details Deleted..")
        this.getAllBuldingList()
      },
      error:(err)=>{
        alert("Error while Deleting")
      }
    })
  }

// To ad new Building information here with Building name, Floor number and Building number.
  addBulding(){
    this.dialog.open(DialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllBuldingList()
      }
    })
  }

  getAllBuldingList(){ // Getting data From json server
    this.api.getBulding()
    .subscribe({
      next:(res:any)=>{
        console.log(res);
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

