import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, mergeMap, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CreateGameTitleDto } from '../../model/CreateGameTitleDto';
import { GameTitleDto } from '../../model/GameTitleDto';
import { IUser } from '../../model/IUser';
import { GameTitleService } from '../../services/game.service';
import { fileValidator } from '../utils/FileValidator';

@Component({
  selector: 'app-edit-game-title',
  templateUrl: './edit-game-title.component.html',
  styleUrls: ['./edit-game-title.component.css']
})
export class EditGameTitleComponent implements OnInit {

  gameTitleForm!: FormGroup;
  image?: File;
  errorMessage!: string;
  refreshGameTitleRequest$ = new BehaviorSubject(undefined);
  currentUser?: IUser;
  isLoggedIn$: Observable<boolean> = this.authenticationService.isLoggedIn$;
  isUserOwner?: boolean;
  gameTitle!: GameTitleDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
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
        this.gameTitleForm = this.populateForm(this.gameTitle);
      });
  }

  populateForm(gameTitle: GameTitleDto): FormGroup {
    return this.fb.group({
      'title': new FormControl(gameTitle.title, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'description': new FormControl(gameTitle.description, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      'image': new FormControl(null, [fileValidator()])
    });
  }

  onSubmit(): void {
    const { title, description } = this.gameTitleForm.value;
    const gameTitle: CreateGameTitleDto = new CreateGameTitleDto(title, description);
    gameTitle.image = this.image;
    this.gameTitleService.edit$(this.gameTitle.id, gameTitle).subscribe({
      next: () => {
        this.router.navigateByUrl('/game-titles');
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    })
  }

  onFileChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.image = input!.files![0];
  }

  isFormDisabled(): boolean {
    if(this.gameTitleForm.invalid || this.gameTitleForm.untouched) {
      if(this.image) {
        return false;
      }
      return true;
    }
    return this.gameTitleForm.invalid;
  }
}
