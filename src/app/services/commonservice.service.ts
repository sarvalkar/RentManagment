import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  private myBehaviorSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoggedInUser(value: boolean) {
    this.myBehaviorSubject.next(value);
  }

  getLoggedInUser():Observable <boolean> {
    return this.myBehaviorSubject.asObservable();
  }
}
