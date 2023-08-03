import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

  private baseUrl = 'http://localhost:3000/rentPay/';
 

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<any> {
     const formData: FormData = new FormData();

     formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'http://localhost:3000/rentPay/';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData);
}

postRenPay(data:any){
  return this.http.post<any>("http://localhost:3000/rentPay/",data);
}


  getFiles(): Observable<any> {
    return this.http.get('http://localhost:3000/rentPay/');
  }
 
	
  downloadFile(){
    return this.http.get<any>("http://localhost:3000/rentPay/");
  }
  
}
