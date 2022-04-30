import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../core/guard/logged-in.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { EditGameTitleComponent } from './edit-game-title/edit-game-title.component';
import { GameTitleDetailsComponent } from './game-title-details/game-title-details.component';
import { GameTitlesListComponent } from './game-titles-list/game-titles-list.component';
import { MyGameTitlesComponent } from './my-game-titles/my-game-titles.component';
import { NewGameTitleComponent } from './new-game-title/new-game-title.component';

const routes: Routes = [
  {
    path: '',
    component: GameTitlesListComponent
  }, {
    path: 'new',
    canActivate: [LoggedInGuard],
    component: NewGameTitleComponent
  },{
    path: 'my-game-titles',
    canActivate: [LoggedInGuard],
    component: MyGameTitlesComponent
  }, {
    path: ":gameTitleId",
    canActivate: [LoggedInGuard],
    component: GameTitleDetailsComponent
  }, {
    path: ':gameTitleId/edit',
    canActivate: [LoggedInGuard],
    component: EditGameTitleComponent
  }, {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameTitlesRoutingModule { }
