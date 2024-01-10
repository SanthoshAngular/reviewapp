import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StarRatingComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbRatingModule,
    FormsModule
  ],
  exports: [
    StarRatingComponent
  ]
})
export class FeatureModule { }
