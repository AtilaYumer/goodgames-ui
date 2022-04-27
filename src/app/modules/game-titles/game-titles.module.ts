import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { GameTitlesRoutingModule } from './game-titles-routing.module';
import { GameTitlesListComponent } from './game-titles-list/game-titles-list.component';
import { GameTitlesListItemComponent } from './game-titles-list-item/game-titles-list-item.component';
import { NewGameTitleComponent } from './new-game-title/new-game-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameTitleDetailsComponent } from './game-title-details/game-title-details.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentsListItemComponent } from './comments-list-item/comments-list-item.component';


@NgModule({
  declarations: [
    GameTitlesListComponent,
    GameTitlesListItemComponent,
    NewGameTitleComponent,
    GameTitleDetailsComponent,
    NewCommentComponent,
    CommentsListComponent,
    CommentsListItemComponent
  ],
  imports: [
    CommonModule,
    GameTitlesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class GameTitlesModule { }
