import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe';
import { Comment } from '../../shared/models/comment/comment';
import { UserService } from '../../core/user.service';

@Component({
  selector: 'fg-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {
  @Input()
  recipe: Recipe;

  commentsOpen: boolean;


  constructor(private userService: UserService) {
    this.commentsOpen = false;
  }

  ngOnInit() {

  }

  changeCommentsState() {
    this.commentsOpen = !this.commentsOpen;
  }

  addComment() {
    const comment = new Comment();
    this.recipe.comments.push(new Comment());
  }

}
