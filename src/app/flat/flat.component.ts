import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogforflatComponent } from '../dialogforflat/dialogforflat.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.scss']
})
export class FlatComponent implements OnInit {

  displayedColumns: string[] = ['flatName', 'flooreNumber', 'buildingName', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog,private api:ApiService) { }

  ngOnInit(): void {
    this.getAllFlatList();
  }

  addFlat(){
    this.dialog.open(DialogforflatComponent, {
      width:'30%'
     }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllFlatList()
      }
    })
  }

  editFlat(row:any){
    this.dialog.open(DialogforflatComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllFlatList()
      }
    })
  }

  deleteFlat(flatName:string){
    this.api.deleteFlat(flatName)
    .subscribe({
      next:(res)=>{
        alert("Building Details Deleted..")
        this.getAllFlatList()
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

  getAllFlatList(){
    this.api.getFlat()
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
