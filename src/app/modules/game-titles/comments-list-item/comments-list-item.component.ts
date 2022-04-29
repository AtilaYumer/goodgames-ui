import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentDto } from '../../model/CommentDto';
import { IUser } from '../../model/IUser';
import { GameTitleService } from '../../services/game.service';

@Component({
  selector: 'app-comments-list-item',
  templateUrl: './comments-list-item.component.html',
  styleUrls: ['./comments-list-item.component.css']
})
export class CommentsListItemComponent implements OnInit {

  @Input() gameTitleId!: number;

  @Input() comment!: CommentDto;

  @Output() commentEvent: EventEmitter<any> = new EventEmitter();

  currentUser?: IUser;

  isUserOwner?: boolean;

  isLoggedIn$: Observable<boolean> = this.authenticationService.isLoggedIn$;


  constructor(
    private gameTitleService: GameTitleService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    combineLatest([
      this.authenticationService.currentUser$
    ])
      .subscribe(([user]) => {
        this.currentUser = user;
        this.isUserOwner = this.currentUser && this.comment.userId === this.currentUser.id;
      });
  }

  delete(): void {
    this.gameTitleService.deleteComment$(this.gameTitleId, this.comment.id).subscribe({
      next: () => {
        this.commentEvent.emit();
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }
}
