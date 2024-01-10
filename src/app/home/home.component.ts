import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Injecting necessary services (HttpClient for HTTP requests, Router for navigation)
  constructor(private http: HttpClient, private route: Router) {
  }

  // Arrays to store movie data
  trendingMovies!: any[];
  theatreMovies!: any[];
  popularMovies!: any[];

  // Arrays to hold initial and remaining movies for each category
  initialMovies!: any[];
  remainingTrendingMovies!: any[];

  initialTheatreMovies!: any[];
  remainingTheatreMovies!: any[];

  initialPopularMovies!: any[];
  remainingPopularMovies!: any[];

  // Flags to control visibility of 'View All' buttons
  viewAllTrending: boolean = false;
  viewAllTheatre: boolean = false;
  viewAllPopular: boolean = false;

  // Fetch initial data when component initializes
  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTheatreMovies();
    this.getPopularMovies();
  }

  // Fetch trending movies data from a JSON file
  getTrendingMovies() {
    this.http.get<any[]>('http://localhost:4200/assets/trending-movies.json').subscribe((movies) => {
      this.trendingMovies = movies;
      this.initialMovies = this.trendingMovies.slice(0, 3);
      this.remainingTrendingMovies = this.trendingMovies.slice(3);
    });
  }

  // Fetch theatre movies data from a JSON file
  getTheatreMovies() {
    this.http.get<any[]>('http://localhost:4200/assets/theatre-movies.json').subscribe((movies) => {
      this.theatreMovies = movies;
      this.initialTheatreMovies = this.theatreMovies.slice(0, 3);
      this.remainingTheatreMovies = this.theatreMovies.slice(3);
    });
  }

  // Fetch popular movies data from a JSON file
  getPopularMovies() {
    this.http.get<any[]>('http://localhost:4200/assets/popular-movies.json').subscribe((movies) => {
      this.popularMovies = movies;
      this.initialPopularMovies = this.popularMovies.slice(0, 5);
      this.remainingPopularMovies = this.popularMovies.slice(5);
    });
  }

  // Navigate to a specific movie based on type and ID
  goToMovie(type: any, id: any) {
    this.route.navigate(['movie', type, id]);
  }

  // Toggle 'View All' for trending movies
  toggleAllMovies() {
    this.viewAllTrending = !this.viewAllTrending;
  }

  // Toggle 'View All' for theatre movies
  toggleAllMovies2() {
    this.viewAllTheatre = !this.viewAllTheatre;
  }

  // Toggle 'View All' for popular movies
  toggleAllMovies3() {
    this.viewAllPopular = !this.viewAllPopular;
  }
}