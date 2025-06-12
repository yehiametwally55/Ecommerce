import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){
    if(localStorage.getItem('token') != null){
      _Router.navigate(['/home']);
    } 
  }
  LoginForm:FormGroup = new FormGroup({
    email : new FormControl(null ,[ Validators.required , Validators.email]),
    password : new FormControl(null , Validators.required),
  });

  login(){
    console.log(this.LoginForm);
    try{
      this._AuthService.handleLogin(this.LoginForm.value).subscribe({
        next:(response)=> {
          if(response.message == "success"){
            localStorage.setItem("token" , response.token)
            this._AuthService.userToken = response.token
            this._Router.navigate(['/home'])
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
    catch(error){
      console.log(error);
    }
  }
}
