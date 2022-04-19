import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateGameTitleDto } from '../../model/CreateGameTitleDto';
import { GameTitleService } from '../../services/game.service';

@Component({
  selector: 'app-new-game-title',
  templateUrl: './new-game-title.component.html',
  styleUrls: ['./new-game-title.component.css']
})
export class NewGameTitleComponent implements OnInit {

  gameTitleForm: FormGroup = this.fb.group({
    'title': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    'description': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
    'image': new FormControl(null, [Validators.required])
  });

  image?: File;

  constructor(private fb: FormBuilder, private gameTitleService: GameTitleService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { title, description } = this.gameTitleForm.value;
    const gameTitle: CreateGameTitleDto = new CreateGameTitleDto(title, description);
    gameTitle.image = this.image;
    this.gameTitleService.create$(gameTitle).subscribe({ 
      next: () => {
        this.router.navigateByUrl('/game-titles');
      },
      error: (error) => {
        console.log(error);

      }
    })
  }

  onFileChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    this.image = input!.files![0];
  }

}
