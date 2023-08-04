
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogforRentPayComponent } from '../dialogfor-rent-pay/dialogfor-rent-pay.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FileserviceService } from '../services/fileservice.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { log } from 'util';

@Component({
  selector: 'app-rentpay',
  templateUrl: './rentpay.component.html',
  styleUrls: ['./rentpay.component.scss']
})
export class RentpayComponent implements OnInit {
  jsonData:any
  displayedColumns: string[] = [ 'renterName','rentAmmount', 'monthOfPayment', 'rentType', 'electricBill', 'waterBill', 'action'];
  dataSource!: MatTableDataSource<any>;
  public downloadUrl: any;
  filename = "";
  allowedFileExtensions = ['json'];
  public data: any;
  public allRenterPayData: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  downloadJsonHref: any;
  selectedFiles!: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  currentFile?: File;
  previews: string[] = [];
  fileInfos?: Observable<any>;
  file?: File;
  extensionFile!: false;
  isUploded = true;
  fetchData?:any;
  fileToUpload!: File;
  localUrl: any;
 
  constructor(private http: ApiService,public dialog: MatDialog, private _http:HttpClient,
    private api: ApiService, private fileService: FileserviceService) {}
    sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

 
  ngOnInit(): void {
    this.getAllRenterList();
//     this.api.getRentPay().subscribe(data => {
//       this.data = data;         //Reading JSON Data
//       this.getAllRenterList();    //Calling getAllRenterList Function
// });
  }
  
  addRenter() {
    this.dialog.open(DialogforRentPayComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllRenterList()
      }
    })
  }
// function to download tha rent pay data
  generateDownloadJsonUri() {
    this.fileService.downloadFile().subscribe(res => {
      let exportData = res;
      return saveAs(
        new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }), 'RentPay.json'
      );
    })
  }

// to validate file type is json
validateFile(name: String) {
  var ext = name.substring(name.lastIndexOf('.') + 1);
  if (ext.toLowerCase() == 'json') {
      return true;
  }
  else {
      return false;
  }
}
//Function fro selecting file to upload in rent pay list.
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    console.log('path',event.target.files);
    
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      if(!this.validateFile(this.selectedFiles[0].name)){
        alert('upload valid json file')
        this.isUploded = false;
      }else{
        this.isUploded = true;
      }
      
    }
  }
// Function for uploading the file
  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);      
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();//to read the contents of files
        reader.onload = (e: any) => {  
          console.log('e',e);  
          const fileContent = e.target.result;                
          try{
            let jsonData =JSON.parse(fileContent.toString());//JSON parsing is used for converting a JSON object in text format to a Javascript object that can be used inside a program
            if(Array.isArray(jsonData)){
              jsonData = jsonData[0]  
            }
            this.fileService.postRenPay(jsonData).subscribe(res=>{
              alert('file uploded successfully..')      
            })
          } catch(error){
            console.log(error); 
          };
        };
        reader.readAsText(this.selectedFiles[i]);
      }
    }
  }
//Functon for Updating existing row.
  editRenter(row: any) {
    this.dialog.open(DialogforRentPayComponent, {
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllRenterList()
      }
    })
  }

  deleteRenter(renterName: string) {
    this.api.deleteRenPay(renterName)
      .subscribe({
        next: (res) => {
          alert("Rent pay Details Deleted..")
          this.getAllRenterList()
        },
        error: (err) => {
          alert("Error while Deleting")
        }
      })
  }

  applyFilter(event: Event) { // Material  Function For table filter
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllRenterList() {
    this.api.getRentPay()
      .subscribe({
        next: (res: any) => {
          if(res){
            this.fetchData = res;
            console.log(this.fetchData);
            
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort
          }    
        },
        error: (err) => {
          alert("Error while fetching data")
        }
      })
    // if (this.data) {
    //    const dataList = this.data;
    //   let tempArr : any = [];
    //   for (let {} of dataList) {
    //     this.api.getRentPay().subscribe((Response: any) => {
    //       tempArr.push(Response[0]);   
    //       this.dataSource = new MatTableDataSource(tempArr);
    //        this.dataSource.paginator = this.paginator;
    //        this.dataSource.sort = this.sort      //Pushing Response to Array
    //     })        
    //   }
    //   console.log(tempArr)
    //  // this.allRenterPayData = tempArr;   //Assigning Array to allRenterPayData
    // }
  }

}
