import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  


  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'car-feed',
    loadChildren: () => import('./main/car-feed/car-feed.module').then( m => m.CarFeedPageModule)
  },
  {
    path: 'car-rent/:id',
    loadChildren: () => import('./main/car-rent/car-rent.module').then( m => m.CarRentPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./main/profile/profile.module').then( m => m.ProfilePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
