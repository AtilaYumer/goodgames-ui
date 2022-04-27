import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentDto } from '../../model/CommentDto';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  @Input() comments!: CommentDto[];

  @Output() commentEvent: EventEmitter<any> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}
