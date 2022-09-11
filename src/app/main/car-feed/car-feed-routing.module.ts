import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarFeedPage } from './car-feed.page';

const routes: Routes = [
  {
    path: '',
    component: CarFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarFeedPageRoutingModule {}
