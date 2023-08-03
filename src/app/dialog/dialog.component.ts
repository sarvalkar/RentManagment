import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

buildingForm! : FormGroup;
actionBtn:string = "Save";

  constructor(private formBuilder:FormBuilder,private api: ApiService, 
    @Inject(MAT_DIALOG_DATA)public editData:any,
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void { //Form Controls
    this.buildingForm = this.formBuilder.group({
      buildingName: ['',Validators.required],
      flooreNumber: ['',Validators.required],
      buildingNumber: ['',Validators.required]
    })
    if(this.editData){ // On update setting values to perticuler fields.
      this.actionBtn = "Update";
      this.buildingForm.controls['buildingName'].setValue(this.editData.buildingName)
      this.buildingForm.controls['flooreNumber'].setValue(this.editData.flooreNumber)
      this.buildingForm.controls['buildingNumber'].setValue(this.editData.buildingNumber)
    }
  }

  addBuilding(){ // Sending data on save to json server
    if(!this.editData){
  if(this.buildingForm.valid){

    this.api.postBuilding({...this.buildingForm.value, id: uuidv4()})
    .subscribe({
      next:(res)=>{
        alert("Bulding details added successfully")
        this.buildingForm.reset();
        this.dialogRef.close('save');
      },
      error:()=>{
        alert("something went wrong!")
      }
    })
   }
    }else{
      this.updateBuilding()
    }
  }
  updateBuilding(){ // Update data On updat og building form
    this.api.putBuilding(this.buildingForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Building details updated successfully")
        this.buildingForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("something went wrong!")
      }
    })
  }
}
