import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dialogfor-renter',
  templateUrl: './dialogfor-renter.component.html',
  styleUrls: ['./dialogfor-renter.component.css']
})
export class DialogforRenterComponent implements OnInit {

  renterform!: FormGroup;
actionBtn:string = "Save";

buildingList:Array<any> = [];
floorList:Array<any> = [];
url: string = 'http://localhost:3000/buildingList/';
flatList:Array<any> = [];
url1: string = 'http://localhost:3000/flatList/';

  constructor(private formBuilder:FormBuilder,private http:HttpClient,
    private dialogRef:MatDialogRef<DialogforRenterComponent>,
    @Inject(MAT_DIALOG_DATA)public editDataforRenter:any,
    private api: ApiService) { }

  ngOnInit(): void {
    this.renterform = this.formBuilder.group({
      renterName:['',Validators.required],
      floorNumber: ['',Validators.required],
      flatName: ['',Validators.required],
      buildingName: ['',Validators.required]  
    })
    // this.http.get(this.url).subscribe(res => {
    //   this.buildingList = res;
    // });

    this.http.get(this.url).subscribe(res => {
      this.buildingList = (res as Array<any>).map((building) => {return {buildingName: building.buildingName, building_id: building.id, floorNumber: building.floorNumber}} )
    });

    // this.http.get(this.url1).subscribe(res => {
    //   this.flatList = res;
    // });

    this.http.get(this.url1).subscribe(res => {
      this.flatList = (res as Array<any>).map((flat) => {return {flatName: flat.flatName, building_id: flat.id, floorNumber: flat.floorNumber}} )
    });

    if(this.editDataforRenter){
      this.actionBtn = "Update";
      this.renterform.controls['buildingName'].setValue(this.editDataforRenter.buildingName)
      this.renterform.controls['renterName'].setValue(this.editDataforRenter.renterName)
      this.renterform.controls['floorNumber'].setValue(this.editDataforRenter.floorNumber)
      this.renterform.controls['flatName'].setValue(this.editDataforRenter.flatName)
    }
  }
  
  addRenter(){
    if(!this.editDataforRenter){
      if(this.renterform.valid){
        this.api.postRenter({...this.renterform.value, id:uuidv4(),
           building_id: this.renterform.value.buildingName.building_id })
        .subscribe({
          next:(res)=>{
            alert("Flat details added successfully")
            console.log(res); 
            this.renterform.reset();
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
    this.api.putRenter(this.renterform.value,this.editDataforRenter.id)
    .subscribe({
      next:(res)=>{
        alert("Building details updated successfully")
        console.log(this.renterform.value,this.editDataforRenter.id);
        
        this.renterform.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("something went wrong!")
      }
    })
  }
}
