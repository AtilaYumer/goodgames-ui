import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { GameTitleDto } from '../../model/GameTitleDto';

@Component({
  selector: 'app-game-titles-list-item',
  templateUrl: './game-titles-list-item.component.html',
  styleUrls: ['./game-titles-list-item.component.css']
})
export class GameTitlesListItemComponent implements OnInit {

  isLoggedIn?: Observable<boolean>;

  @Input() gameTitle!: GameTitleDto;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn$;
  }

}
