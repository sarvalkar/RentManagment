import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
login:FormGroup | any;
  constructor(private _http:HttpClient, private router:Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      'fname': new FormControl('',Validators.required),
      'password': new FormControl(),
    })
  }

  logindata(login:FormGroup)
  {

    this._http.get<any>("http://localhost:3000/login")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.fname === this.login.value.fname && a.password === this.login.value.password
      });
      if(user){
        alert('You are successfully loged in...');
        this.login.reset();
       // $('.form-box').css('display','none');
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
