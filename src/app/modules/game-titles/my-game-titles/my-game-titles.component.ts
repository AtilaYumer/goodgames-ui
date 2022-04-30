import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameTitleDto } from '../../model/GameTitleDto';
import { GameTitleService } from '../../services/game.service';

@Component({
  selector: 'app-my-game-titles',
  templateUrl: './my-game-titles.component.html',
  styleUrls: ['./my-game-titles.component.css']
})
export class MyGameTitlesComponent implements OnInit {

  gameTitles: GameTitleDto[] = [];

  constructor(
    private gameTitlesService: GameTitleService,
    private router: Router) { }

  ngOnInit(): void {
    this.gameTitlesService.getMyGames$().subscribe({
      next: (response) => {
        this.gameTitles = response.content;
      },
      error: (err) => {
        this.router.navigateByUrl('/not-found');
      }
    })
  }

}
