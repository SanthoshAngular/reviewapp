import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private route: Router) { }
  // Initializing an array to store user credentials
  private users: { username: string; password: string }[] = [];

  // Method to navigate to the login page
  logout() {
    this.route.navigate(['login']);
  }

  // Method to navigate to the home page
  goToHome() {
    this.route.navigate(['home']);
  }

  // Variable to store user rating
  userRating: any;

  // Method to register a new user
  signup(username: string, password: string) {
    // Checking if the user already exists
    const userExists = this.users.some((user) => user.username === username);
    if (userExists) {
      return false; // Return false if user already exists
    }

    // If user doesn't exist, add to the users array
    this.users.push({ username, password });
    return true; // Return true for successful signup
  }

  // Method to handle user login
  login(username: string, password: string) {
    // Finding the user based on provided credentials
    const user = this.users.find((u) => u.username === username && u.password === password);

    // Return status codes based on user existence and credentials match
    return user ? 200 : 403; // 200 for successful login, 403 for unauthorized access
  }

}
