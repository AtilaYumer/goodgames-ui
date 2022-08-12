import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './modules/core/about/about.component';
import { UsersComponent } from './modules/core/users/users.component';
import { HomeComponent } from './modules/shared/home/home.component';
import { NotFoundComponent } from './modules/shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'users',
    component: UsersComponent
  }, {
    path: 'game-titles',
    loadChildren: () => import('./modules/game-titles/game-titles.module').then(m => m.GameTitlesModule)
  }, {
    path: 'not-found',
    component: NotFoundComponent
  }, {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
