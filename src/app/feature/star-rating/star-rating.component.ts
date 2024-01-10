import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {

constructor(private auth: AuthService) {
    // Initializing the AuthService for user-related functionality
  }

  // Input properties for the star rating component
  @Input() rating: any; // Input for the initial rating value
  @Input() isReadonly: boolean = false; // Input to set whether the rating is read-only

  // Variables for rating functionality
  rate: boolean = true; // Variable to manage rating action
  @Input() ratingcount = 0; // Counter for the number of ratings
  totalrating: any = 0; // Accumulator for the total ratings
  @Input() finalrating: any; // Final calculated rating value

  // FormControl to manage user input for rating
  ratingControl = new FormControl();

  @Input() showRating: boolean = false; // Input to toggle displaying the rating

  // Method to calculate and update the user rating
  user() {
    this.ratingcount += 1; // Increment the rating count
    // Add the current rating to the total rating
    this.totalrating += this.ratingControl?.value || null;
    // Calculate the final rating by averaging the total rating and count
    this.finalrating = (this.totalrating / this.ratingcount).toFixed(1);
    // Update the user's rating in the AuthService
    this.auth.userRating = this.finalrating;
  }

}
