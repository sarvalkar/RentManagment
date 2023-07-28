
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-dialogfor-rent-pay',
  templateUrl: './dialogfor-rent-pay.component.html',
  styleUrls: ['./dialogfor-rent-pay.component.css']
})
export class DialogforRentPayComponent implements OnInit {

rentPayform!: FormGroup;
actionBtn:string = "Save";
rentererList:any;
url: string = 'http://localhost:3000/renterList/';

rentTypeList:any=['Active month','Due rent'];
monthOfPayment = new FormControl();

  constructor(private formBuilder:FormBuilder,private http:HttpClient,
    private dialogRef:MatDialogRef<DialogforRentPayComponent>,
    @Inject(MAT_DIALOG_DATA)public editDataforRenter:any,
    private api: ApiService) { }

  ngOnInit(): void {
    this.rentPayform = this.formBuilder.group({
      renterName:['',Validators.required],
      rentAmmount: ['',Validators.required],
      monthOfPayment: ['',Validators.required],
      rentType: ['',Validators.required] ,
      electricBill:[''],
      waterBill:['']
    })
    this.http.get(this.url).subscribe(res => {
      this.rentererList = res;
    });

    if(this.editDataforRenter){
      this.actionBtn = "Update";
      this.rentPayform.controls['rentAmmount'].setValue(this.editDataforRenter.rentAmmount)
      this.rentPayform.controls['renterName'].setValue(this.editDataforRenter.renterName)
      this.rentPayform.controls['monthOfPayment'].setValue(this.editDataforRenter.monthOfPayment)
      this.rentPayform.controls['rentType'].setValue(this.editDataforRenter.rentType)
      this.rentPayform.controls['electricBill'].setValue(this.editDataforRenter.electricBill)
      this.rentPayform.controls['waterBill'].setValue(this.editDataforRenter.waterBill)
    }
  }
  
  addRentPay(){
    if(!this.editDataforRenter){
      if(this.rentPayform.valid){
        this.api.postRenPay(this.rentPayform.value)
        .subscribe({
          next:(res)=>{
            alert("Rent Pay details added successfully")
            console.log(res); 
            this.rentPayform.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("something went wrong!")
          }
        })
       }
    }else{
      this.updateRenter()
    }
  }

  updateRenter(){
    this.api.putRenPay(this.rentPayform.value,this.editDataforRenter.id)
    .subscribe({
      next:(res)=>{
        alert("Rent Pay details updated successfully")
        console.log(this.rentPayform.value,this.editDataforRenter.id);
        
        this.rentPayform.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("something went wrong!")
      }
    })
  }
}

