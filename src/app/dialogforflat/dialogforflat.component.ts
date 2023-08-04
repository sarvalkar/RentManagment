import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-dialogforflat',
  templateUrl: './dialogforflat.component.html',
  styleUrls: ['./dialogforflat.component.css']
})
export class DialogforflatComponent implements OnInit {

flatForm!: FormGroup;
actionBtn:string = "Save";

  constructor(private formBuilder:FormBuilder,private http:HttpClient,
      private dialogRef:MatDialogRef<DialogforflatComponent>,
      @Inject(MAT_DIALOG_DATA)public editDataforFlat:any,
      private api: ApiService) { }

  buildingList:Array<any> = [];
  floorList:Array<any> = [];
  url: string = 'http://localhost:3000/buildingList/';

  ngOnInit(): void {
    this.flatForm = this.formBuilder.group({
      flatName:['',Validators.required],
      buildingName: ['',Validators.required],
      floorNumber: ['',Validators.required],  
    })
    this.http.get(this.url).subscribe(res => {
      this.buildingList = (res as Array<any>).map((building) => {return {buildingName: building.buildingName, building_id: building.id, floorNumber: building.floorNumber}} )
    });

    if(this.editDataforFlat){
      this.actionBtn = "Update";
      this.flatForm.controls['buildingName'].setValue(this.editDataforFlat.buildingName)
      this.flatForm.controls['floorNumber'].setValue(this.editDataforFlat.floorNumber)
      this.flatForm.controls['flatName'].setValue(this.editDataforFlat.flatName)
    }   
  }

  addFlat(){
    if(!this.editDataforFlat){
      if(this.flatForm.valid){
        this.api.postFlat({...this.flatForm.value,
         id:uuidv4(), building_id: this.flatForm.value.buildingName.building_id })//The “Universally unique identifier”, or UUID,used for provide a consistent format for any unique ID we use for our data
        .subscribe({
          next:(res)=>{
            alert("Flat details added successfully")
            console.log(res); 
            this.flatForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("something went wrong!")
          }
        })
       }
    }else{
      this.updateFlat()
    }
  }

  updateFlat(){
    this.api.putFlat(this.flatForm.value,this.editDataforFlat.id)
    .subscribe({
      next:(res)=>{
        alert("Building details updated successfully")
        console.log(this.flatForm.value,this.editDataforFlat.id);
        
        this.flatForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("something went wrong!")
      }
    })
  }
}
