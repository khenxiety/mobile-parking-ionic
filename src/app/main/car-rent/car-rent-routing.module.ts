import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarRentPage } from './car-rent.page';

const routes: Routes = [
  {
    path: '',
    component: CarRentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRentPageRoutingModule {}
