import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarFeedPageRoutingModule } from './car-feed-routing.module';

import { CarFeedPage } from './car-feed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarFeedPageRoutingModule
  ],
  declarations: [CarFeedPage]
})
export class CarFeedPageModule {}
