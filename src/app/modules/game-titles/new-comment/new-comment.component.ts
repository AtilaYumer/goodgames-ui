import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateCommentDto } from '../../model/CreateCommentDto';
import { GameTitleService } from '../../services/game.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() gameTitleId!: number;

  @Output() commentEvent: EventEmitter<any> = new EventEmitter();

  errorMessage!: string;

  submitted: boolean = false;

  commentForm: FormGroup = this.formBuilder.group({
    'comment': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)])
  });

  constructor(private formBuilder: FormBuilder, private gameTitleService: GameTitleService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }
    const { comment } = this.commentForm.value;
    const createCommentDto: CreateCommentDto = new CreateCommentDto(comment);
    this.gameTitleService.comment$(this.gameTitleId, createCommentDto).subscribe({
      next: () => {
        this.submitted = false;
        this.commentForm.reset();
        // this.commentForm.clea
        this.commentEvent.emit();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    })
  }

}
