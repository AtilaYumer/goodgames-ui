import { Component, OnInit } from '@angular/core';
import { GameTitleDto } from '../../model/GameTitleDto';
import { GameTitleService } from '../../services/game.service';

@Component({
  selector: 'app-game-titles-list',
  templateUrl: './game-titles-list.component.html',
  styleUrls: ['./game-titles-list.component.css']
})
export class GameTitlesListComponent implements OnInit {

  gameTitles: GameTitleDto[] = [];

  constructor(private gameTitlesService: GameTitleService) { }

  ngOnInit(): void {
    this.gameTitlesService.getGames().subscribe({
      next: (response) => {
        console.log(response);
        this.gameTitles = response.content;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
