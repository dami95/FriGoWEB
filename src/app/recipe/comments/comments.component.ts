import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe';

@Component({
  selector: 'fg-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  @Input()
  recipe: Recipe;

  commentsOpen: boolean;


  constructor() {
    this.commentsOpen = false;
  }

  ngOnInit() {

  }

  changeCommentsState() {
    this.commentsOpen = !this.commentsOpen;
  }

}
