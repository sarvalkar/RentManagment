import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonserviceService } from '../services/commonservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login:FormGroup | any;
  constructor(private _http:HttpClient, private router:Router,private fb: FormBuilder, private commonService:CommonserviceService) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      'fname': new FormControl('',Validators.required),
      'password': new FormControl(),
    })
  }

  loginUser(login:FormGroup)
  {
// Matching Id password with json Data
    this._http.get<any>("http://localhost:3000/login")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.fname === this.login.value.fname && a.password === this.login.value.password
      });
      if(user){
        alert('You are successfully loged in...');//if successfull login
        this.login.reset();
        this.commonService.setLoggedInUser(true);
        this.router.navigate(['/dashboard']);
      }else{
        alert('user not found');
        this.router.navigate(['login'])
      }
    },err=>{
      alert('sumthing went wrong!')
    })  
  }

}
