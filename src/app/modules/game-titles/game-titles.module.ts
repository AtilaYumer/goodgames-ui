import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { GameTitlesRoutingModule } from './game-titles-routing.module';
import { GameTitlesListComponent } from './game-titles-list/game-titles-list.component';
import { GameTitlesListItemComponent } from './game-titles-list-item/game-titles-list-item.component';
import { NewGameTitleComponent } from './new-game-title/new-game-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameTitleDetailsComponent } from './game-title-details/game-title-details.component';


@NgModule({
  declarations: [
    GameTitlesListComponent,
    GameTitlesListItemComponent,
    NewGameTitleComponent,
    GameTitleDetailsComponent
  ],
  imports: [
    CommonModule,
    GameTitlesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class GameTitlesModule { }
