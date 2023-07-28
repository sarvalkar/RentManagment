import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  displayedColumns: string[] = ['buildingName', 'flooreNumber', 'buildingNumber', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api:ApiService ) { }

  ngOnInit(): void {
    this.getAllBuldingList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editBuilding(row:any){
    this.dialog.open(DialogComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllBuldingList()
      }
    })
  }

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

  addBulding(){
    this.dialog.open(DialogComponent, {
     width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllBuldingList()
      }
    })
  }

  getAllBuldingList(){
    this.api.getBulding()
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

