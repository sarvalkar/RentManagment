
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogforRenterComponent } from '../dialogfor-renter/dialogfor-renter.component';
import {  MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogforRentPayComponent } from '../dialogfor-rent-pay/dialogfor-rent-pay.component';

@Component({
  selector: 'app-rentpay',
  templateUrl: './rentpay.component.html',
  styleUrls: ['./rentpay.component.scss']
})
export class RentpayComponent implements OnInit {

  displayedColumns: string[] = ['renterName', 'rentAmmount', 'monthOfPayment', 'rentType', 'electricBill','waterBill','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private api:ApiService) { }

  ngOnInit(): void {
    this.getAllRenterList();
  }


  addRenter(){
    this.dialog.open(DialogforRentPayComponent, {
      width:'30%'
     }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllRenterList()
      }
    })
  }


  editRenter(row:any){
    this.dialog.open(DialogforRentPayComponent,{
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllRenterList()
      }
    })
  }

  deleteRenter(renterName:string){
    this.api.deleteRenPay(renterName)
    .subscribe({
      next:(res)=>{
        alert("Rent pay Details Deleted..")
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
    this.api.getRentPay()
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
