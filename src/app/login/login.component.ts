import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Injecting AuthService and Router
  constructor(private auth: AuthService, private route: Router) {}

  count: any; // Variable declaration
  userName: string = ''; // Initializing userName
  password: string = ''; // Initializing password
  errorMessage: string = ''; // Error message placeholder

  ngOnInit(): void {
    // Initialization logic (empty in this case)
  }

  // Function to handle login
  login() {
    // Validating username and password
    if (this.userName.trim().length === 0) {
      this.errorMessage = 'Username Is Required';
    } else if (this.password.trim().length === 0) {
      this.errorMessage = 'Password Is Required';
    } else {
      this.errorMessage = '';
      // Authenticating user
      const loginStatus = this.auth.login(this.userName, this.password);
      if (loginStatus === 200) {
        this.route.navigate(['home']); // Navigating to home if login is successful
      } else if (loginStatus === 403) {
        this.errorMessage = 'Invalid Credentials'; // Handling invalid credentials
      }
    }
  }

  // Function to toggle display of login section
  showLogin: boolean = false;
  toShowlogin() {
    this.showLogin = !this.showLogin;
    if (!this.showLogin) {
      // Resetting form values and error message
      this.userName = '';
      this.password = '';
      this.errorMessage = '';
    }
  }

  // Function to hide login section
  hideLogin() {
    this.showLogin = false;
  }

  // Function to handle user signup
  signup() {
    this.showLogin = false;
    if (this.userName.trim().length === 0) {
      this.errorMessage = 'Username Is Required';
    } else if (this.password.trim().length === 0) {
      this.errorMessage = 'Password Is Required';
    } else {
      this.errorMessage = '';
      // Handling user signup
      const signupSuccessful = this.auth.signup(this.userName, this.password);
      if (signupSuccessful) {
        alert('Signup successful! You can now login.');
      } else {
        this.errorMessage = 'Username already exists. Please choose another.';
      }
    }
  }

  // Handling login/signup switch
  login1 = 'login';
  switch = 'switch to signup';
  switchToSignup() {
    if (this.login1 == 'login') {
      // Toggle between login and signup forms
      this.login1 = 'signup';
      this.switch = 'switch to login';
      this.login();
      console.log('login works');
    } else {
      this.login1 = 'login';
      this.switch = 'switch to signup';
      this.signup();
      console.log('signup works');
    }
  }
}
