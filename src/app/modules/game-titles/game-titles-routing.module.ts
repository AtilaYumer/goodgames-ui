import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameTitlesListComponent } from './game-titles-list/game-titles-list.component';
import { NewGameTitleComponent } from './new-game-title/new-game-title.component';

const routes: Routes = [
  {
    path: '',
    component: GameTitlesListComponent
  }, {
    path: 'new',
    component: NewGameTitleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameTitlesRoutingModule { }
