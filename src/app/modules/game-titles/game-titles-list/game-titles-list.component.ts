import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameTitleDto } from '../../model/GameTitleDto';
import { GameTitleService } from '../../services/game.service';

@Component({
  selector: 'app-game-titles-list',
  templateUrl: './game-titles-list.component.html',
  styleUrls: ['./game-titles-list.component.css']
})
export class GameTitlesListComponent implements OnInit {

  gameTitles: GameTitleDto[] = [];

  constructor(
    private gameTitlesService: GameTitleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gameTitlesService.getGames$().subscribe({
      next: (response) => {
        this.gameTitles = response.content;
      },
      error: (err) => {
        this.router.navigateByUrl('/not-found');
      }
    })
  }

}
