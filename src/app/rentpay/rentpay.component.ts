
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

  displayedColumns: string[] = ['renterName', 'rentAmmount', 'monthOfPayment', 'rentType', 'electricBill', 'waterBill', 'action'];
  dataSource!: MatTableDataSource<any>;
  public downloadUrl: any;
  filename = "";
  allowedFileExtensions = ['json'];

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
  jsonData:any;
  fileToUpload!: File;
  localUrl: any;
 
  constructor(private http: ApiService,public dialog: MatDialog, private api: ApiService, private fileService: FileserviceService) {}
 
  ngOnInit(): void {
    this.getAllRenterList();
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

  generateDownloadJsonUri() {
    this.fileService.downloadFile().subscribe(res => {
      let exportData = res;
      return saveAs(
        new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }), 'sample.json'
      );
    })
  }


validateFile(name: String) {
  var ext = name.substring(name.lastIndexOf('.') + 1);
  if (ext.toLowerCase() == 'json') {
      return true;
  }
  else {
      return false;
  }
}

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    console.log('path',event);
    
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      if(!this.validateFile(this.selectedFiles[0].name)){
        alert('upload valid json file')
      }
      
    }
  }

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
        const reader = new FileReader();
        reader.onload = (e: any) => {  
          const fileContent = reader.result as string;      
          try{
            const jsonData =JSON.stringify(fileContent);
            console.log('result',jsonData);
            this.fileService.postRenPay(jsonData).subscribe(res=>{
              alert('file uploded successfully..')
              console.log(res);       
            })
          } catch(error){
            console.log(error); 
          };
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

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
    this.fileService.getFiles()
      .subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error: (err) => {
          alert("Error while fetching data")
        }
      })
  }

}
