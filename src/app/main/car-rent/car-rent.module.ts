import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarRentPageRoutingModule } from './car-rent-routing.module';

import { CarRentPage } from './car-rent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarRentPageRoutingModule
  ],
  declarations: [CarRentPage]
})
export class CarRentPageModule {}
