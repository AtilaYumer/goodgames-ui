import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, mergeMap, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GameTitleDto } from '../../model/GameTitleDto';
import { IUser } from '../../model/IUser';
import { GameTitleService } from '../../services/game.service';

@Component({
  selector: 'app-game-title-details',
  templateUrl: './game-title-details.component.html',
  styleUrls: ['./game-title-details.component.css']
})
export class GameTitleDetailsComponent implements OnInit {

  refreshGameTitleRequest$ = new BehaviorSubject(undefined);
  currentUser?: IUser;
  isLoggedIn$: Observable<boolean> = this.authenticationService.isLoggedIn$;
  isUserOwner?: boolean;
  gameTitle!: GameTitleDto;
  isCommentBoxOpened: boolean = false;
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameTitleService: GameTitleService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.params
        .pipe(
          mergeMap(params => {
            const gameTitleId = params['gameTitleId'];
            return this.refreshGameTitleRequest$.pipe(mergeMap(() => this.gameTitleService.getGameTitleById$(gameTitleId)))
          })
        ),
      this.authenticationService.currentUser$
    ])
      .subscribe(([gameTitle, user]) => {
        this.currentUser = user;
        this.gameTitle = gameTitle;
        this.isUserOwner = this.currentUser && this.gameTitle.createdById === this.currentUser.id;
      });
  }

  toggleCommentBox(): void {
    this.isCommentBoxOpened = !this.isCommentBoxOpened;
  }

  canLike(): boolean | undefined {
    return this.currentUser && !this.gameTitle.likes.includes(this.currentUser.id);
  }

  like(): void {
    this.gameTitleService.like$(this.gameTitle.id).subscribe(() => this.refreshGameTitleRequest$.next(undefined));
  }

  dislike(): void {
    this.gameTitleService.dislike$(this.gameTitle.id).subscribe(() => this.refreshGameTitleRequest$.next(undefined));
  }

  onEditBtnClicked(gameTitleId: number): void {
    this.router.navigateByUrl(`/game-titles/${gameTitleId}/edit`)
  }

  delete(): void {
    if (confirm(`Are you sure to delete ${this.gameTitle.title}`)) {
      this.gameTitleService.deleteGameTitle$(this.gameTitle.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/game-titles');
        },
        error: () => {
          this.errorMessage = "Something went wrong";
        }
      })
    }
  }
}
