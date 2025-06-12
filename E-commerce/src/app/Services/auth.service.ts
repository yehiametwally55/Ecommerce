import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../Interfaces/register-form';
import{Observable} from "rxjs"
import { LoginForm } from '../Interfaces/login-form';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:3000";

  userToken: any;

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(localStorage.getItem('token') != null){
      this.userToken = localStorage.getItem('token');
    } 
   }

  handleRegister(registerForm: RegisterForm): Observable<any> {
    return this._HttpClient.post(this.baseUrl + "/auth/signUp" , registerForm)
  }
  handleLogin(loginForm: LoginForm): Observable<any> {
    return this._HttpClient.post(this.baseUrl + "/auth/signIn" , loginForm)
  }
  cart(){
    if(localStorage.getItem('token') == null){
      document.querySelector(".cart")?.classList.add("d-none");
    }
    
  }
  logout(){
    localStorage.removeItem("token");
    this.userToken = "";
    this._Router.navigate(['/login']);
  }
}
