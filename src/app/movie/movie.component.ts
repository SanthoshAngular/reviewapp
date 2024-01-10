import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  count: any;
  type: any;
  id: any;
  url = '';
  movie: any;
  details: any;
  date = new Date();

  userName: any = '';
  userRating: any;
  userReview: string = '';
  showRating: boolean = true;
  auth: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private cdr: ChangeDetectorRef) {
    // Constructor with dependency injection
  }

  ngOnInit(): void {
    // Initializing component
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];

    // Determining the URL based on 'type' parameter received from the route
    if (this.type == 'trending') {
      this.url = 'http://localhost:4200/assets/trending-movies.json';
    }
    if (this.type == 'theatre') {
      this.url = 'http://localhost:4200/assets/theatre-movies.json';
    }
    if (this.type == 'popular') {
      this.url = 'http://localhost:4200/assets/popular-movies.json';
    }

    // Fetching movie details based on 'url' and 'id'
    this.getMovie();
  }

  getMovie() {
    // Fetching movie details from the specified URL
    this.http.get(this.url).subscribe((movies) => {
      this.movie = movies;
      // Finding the specific movie based on 'id'
      let index = this.movie.findIndex((movie: { id: string }) => movie.id == this.id);
      if (index > -1) {
        this.movie = this.movie[index];
      }
    });
  }

  submit(userName: string, reviewText: string, userRating: any) {
    // Handling submission of user review for the movie
    const newReview = {
      "auther": userName,
      "published_on": new Date().toLocaleDateString(),
      "review": reviewText,
      "rating": userRating,
    };

    if (userName && reviewText && userRating) {
      // Adding the new review to the movie's reviews array
      if (!this.movie.reviews) {
        this.movie.reviews = [];
      }
      this.movie.reviews.push(newReview);
    }

    // Resetting user inputs after submission
    this.userName = '';
    this.userReview = '';
    this.userRating = '';
  }

  rating: any;
  isReadonly: boolean = false;
  rate: boolean = true;
  ratingcount = 0;
  totalrating: any = 0;
  finalrating: any;
  ratingControl = new FormControl();

  user() {
    // Handling user interaction with movie ratings
    this.ratingcount += 1;
    this.totalrating += this.ratingControl?.value || null;
    this.finalrating = (this.totalrating / this.ratingcount).toFixed(1);
  }
}