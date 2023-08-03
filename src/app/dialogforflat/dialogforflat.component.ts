import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  buildingList:any;
  url: string = 'http://localhost:3000/buildingList/';

  ngOnInit(): void {
    this.flatForm = this.formBuilder.group({
      flatName:['',Validators.required],
      buildingName: ['',Validators.required],
      floorNumber: ['',Validators.required],  
    })
    this.http.get(this.url).subscribe(res => {
      this.buildingList = res;
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
        this.api.postFlat(this.flatForm.value)
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
