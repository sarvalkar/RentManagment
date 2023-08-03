import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

//Building API

buildingData= [{
    building: {
      name:'A',
      id:'1',
      Floor:[{
        number:'1',
        Flats:[{
          number:'1',
          tenant:'Pradeep'
        },
        {
          number:'2',
          tenant:'Shraddha'
        }
    ]
      }
      ]
    }
    
  },
  {
    building: {
      name:'B',
      id:'2',
      Floor:[{
        number:'1',
        Flats:[{
          number:'1',
          tenant:'Ashish'
        },
        {
          number:'2',
          tenant:'Neha'
        }
    ]
      },
      {
        number:'2',
        Flats:[{
          number:'1',
          tenant:'Rahul'
        },
        {
          number:'2',
          tenant:'Priya'
        }
    ]
      },
      ]
    }
    
  }
  
  ]
  


  postBuilding(data:any){
    return this.http.post<any>("http://localhost:3000/buildingList/",data);
  }

  getBulding(){
    return this.http.get<any>("http://localhost:3000/buildingList/");
  }

  putBuilding(data:any, id:number|string){
    return this.http.put<any>("http://localhost:3000/buildingList/"+id, data)
  }

  deleteBuilding(id:number|string){
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

  deleteFlatById(building_id:string){
    return this.http.delete<any>("http://localhost:3000/flatList?building_id="+building_id)
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
