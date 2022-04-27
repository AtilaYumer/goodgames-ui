import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from '../../model/CommentDto';
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

  constructor(private gameTitleService: GameTitleService) { }

  ngOnInit(): void {
  }

  delete() : void {
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
