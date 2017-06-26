import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../shared/models/comment/comment';
import { Recipe } from '../../shared/models/recipe/recipe';
import { RecipeService } from '../recipe.service';
import { NotifierService } from '../../core/notifier.service';
import { UserService } from '../../core/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fg-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.sass']
})
export class CommentTileComponent implements OnInit {
  @Input()
    comment: any;
  @Input()
    recipe: Recipe;
  @Input()
    commentIndex: number;
  @Input()
    isNew: boolean;

  isEditing: boolean;
  editModel: string;

  constructor(
      private notifier: NotifierService,
      private recipes: RecipeService,
      private userService: UserService
  ) {
  }

  ngOnInit() {
    if(this.isNew)
      this.isEditing = true;
    else
      this.isEditing = false;
    this.editModel = this.comment.text;
  }

  isCommentEditable(comment) {
    return this.isNew || this.userService.user === comment.user.userName;
  }

  removeComment() {
    if(confirm('Czy na pewno chcesz usunąć komentarz?')) {
      this.recipes.removeComment(this.comment.id).subscribe(
        status => {
          this.recipe.comments.splice(this.commentIndex, 1);
          this.notifier.success('Komentarz został usunięty');
        },
        error => {
          this.notifier.error('Wystąpił błąd podczas usuwania komentarza');
        }
      );
    }
  }

  editComment() {
    this.isEditing = true;
  }


  cancelCommentEdition() {
    if(confirm('Czy na pewno chcesz odrzucić zmiany?')) {
      this.isEditing = false;
      this.editModel = this.comment.text;
    }
  }

  saveComment() {
    let action: Observable<any>;
    if(this.isNew) {
      action = this.recipes.addComment({ text: this.editModel, recipeId: this.recipe.id});
    } else {
      action = this.recipes.editComment(this.comment.id, { "Text": this.editModel })
    }
    action.subscribe(
        comment => {
          this.comment = comment;
          let successText =
            this.isNew ? 'Pomyślnie zapisano komentarz!' : 'Pomyślnie zapisano zmiany w komentarzu';
          this.notifier.success(successText);
          this.isEditing = false;
          this.isNew = false;
        },
        error => {
          this.notifier.error('Wystąpił błąd podczas zapisu zmian w komentarzu');
        }
    )
  }

}
