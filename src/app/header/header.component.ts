import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    constructor(private auth: AuthService) {
    // Constructor injecting AuthService to use its functionalities
  }

  // Method to trigger logout by utilizing the AuthService's logout function
  logout() {
    this.auth.logout(); // Calls the logout method from the AuthService
  }

  // Method to navigate to the home page by using the AuthService's goToHome function
  goToHome() {
    this.auth.goToHome(); // Calls the goToHome method from the AuthService
  }
}
