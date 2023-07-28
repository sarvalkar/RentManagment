import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

//Building API

  postBuilding(data:any){
    return this.http.post<any>("http://localhost:3000/buildingList/",data);
  }

  getBulding(){
    return this.http.get<any>("http://localhost:3000/buildingList/");
  }

  putBuilding(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/buildingList/"+id, data)
  }

  deleteBuilding(id:number){
    return this.http.delete<any>("http://localhost:3000/buildingList/"+id)
  }

//Flat API

  postFlat(data:any){
    return this.http.post<any>("http://localhost:3000/flatList/",data);
  }

  getFlat(){
    return this.http.get<any>("http://localhost:3000/flatList/");
  }

  putFlat(data:any, flatName:string){
    return this.http.put<any>("http://localhost:3000/flatList/"+flatName, data)    
  }

  deleteFlat(flatName:string){
    return this.http.delete<any>("http://localhost:3000/flatList/"+flatName)
  }

  //Renter API

  postRenter(data:any){
    return this.http.post<any>("http://localhost:3000/renterList/",data);
  }

  getRenter(){
    return this.http.get<any>("http://localhost:3000/renterList/");
  }

  putRenter(data:any, id:string){
    return this.http.put<any>("http://localhost:3000/renterList/"+id, data)    
  }

  deleteRenter(renterName:string){
    return this.http.delete<any>("http://localhost:3000/renterList/"+renterName)
  }

  //RentPay API

  postRenPay(data:any){
    return this.http.post<any>("http://localhost:3000/rentPay/",data);
  }

  getRentPay(){
    return this.http.get<any>("http://localhost:3000/rentPay/");
  }

  putRenPay(data:any, id:string){
    return this.http.put<any>("http://localhost:3000/rentPay/"+id, data)    
  }

  deleteRenPay(renterName:string){
    return this.http.delete<any>("http://localhost:3000/rentPay/"+renterName)
  }


}
