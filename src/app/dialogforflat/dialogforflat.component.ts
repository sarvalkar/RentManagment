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
      flooreNumber: ['',Validators.required],  
    })
    this.http.get(this.url).subscribe(res => {
      this.buildingList = (res as Array<any>).map((building) => {return {buildingName: building.buildingName, building_id: building.id, flooreNumber: building.flooreNumber}} )
    });

    if(this.editDataforFlat){
      this.actionBtn = "Update";
      this.flatForm.controls['buildingName'].setValue(this.editDataforFlat.buildingName)
      this.flatForm.controls['flooreNumber'].setValue(this.editDataforFlat.flooreNumber)
      this.flatForm.controls['flatName'].setValue(this.editDataforFlat.flatName)
    }

    // this.flatForm.get('buildingName')?.valueChanges.subscribe(value => {
    //   if(value) {

    //     this.floorList = this.buildingList.filter((building) => building.building_id === value.building_id)
    //   }
    //   console.log("subscribe",value, this.floorList);
    // })
    
  }

  addFlat(){
    if(!this.editDataforFlat){
      if(this.flatForm.valid){
        this.api.postFlat({...this.flatForm.value, id:uuidv4(), building_id: this.flatForm.value.buildingName.building_id })
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
