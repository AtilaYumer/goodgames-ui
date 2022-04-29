import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  },
  {
    path: 'game-titles',
    loadChildren: () => import('./modules/game-titles/game-titles.module').then(m => m.GameTitlesModule)
  }, {
    path: 'not-found',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
