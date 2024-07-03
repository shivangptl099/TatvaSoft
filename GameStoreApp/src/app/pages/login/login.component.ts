import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoginView: boolean = false

  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: ''
  }
  userLogin: any = {
    userName: '',
    password: ''
  }

  constructor(private router: Router){

  }

  toggleLoginRegister(){
    this.isLoginView = !this.isLoginView
  }

  onRegister(){
    const isLocalData = localStorage.getItem('storageLocal');
    if(isLocalData != null){
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem("storageLocal", JSON.stringify(localArray));
    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem("storageLocal", JSON.stringify(localArray));
    }
    alert("Registeration Successful");
    this.router.navigateByUrl('dashboard')
  }
  onLogin(){
    const isLocalData = localStorage.getItem('storageLocal');
    if(isLocalData != null){
      const users = JSON.parse(isLocalData);
      const isUserFound = users.find((m:any) => m.userName == this.userLogin.userName && m.password == this.userLogin.password)
      if(isUserFound != undefined) {
        this.router.navigateByUrl('dashboard')
      } else {
        alert("User name or password is Wrong")
      }
    } else {
      alert("No User Found");
    }
  }
}
