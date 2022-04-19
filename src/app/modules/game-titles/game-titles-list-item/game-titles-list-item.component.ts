import { Component, Input, OnInit } from '@angular/core';
import { CreateGameTitleDto } from '../../model/CreateGameTitleDto';
import { GameTitleDto } from '../../model/GameTitleDto';

@Component({
  selector: 'app-game-titles-list-item',
  templateUrl: './game-titles-list-item.component.html',
  styleUrls: ['./game-titles-list-item.component.css']
})
export class GameTitlesListItemComponent implements OnInit {

  @Input() gameTitle!: GameTitleDto;

  constructor() { }

  ngOnInit(): void {
  }

}
