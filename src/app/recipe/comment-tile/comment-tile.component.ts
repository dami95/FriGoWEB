import { Component, OnInit, Input} from '@angular/core';
import { Comment } from '../../shared/models/comment/comment';
import { Recipe } from '../../shared/models/recipe/recipe';
import { RecipeService } from '../recipe.service';
import { NotifierService } from "../../core/notifier.service";

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

  isEditing: boolean;
  editModel: string;

  constructor(
      private notifier: NotifierService,
      private recipes: RecipeService
  ) {
  }

  ngOnInit() {
    this.isEditing = false;
    this.editModel = this.comment.text;
  }

  ifCommentEditable(comment) {
    return localStorage.getItem('userName') === comment.user.userName;
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
    this.recipes.editComment(this.comment.id, { "Text": this.editModel }).subscribe(
        comment => {
          this.comment = comment;
          this.notifier.success('Pomyślnie zapisano zmiany w komentarzu');
          this.isEditing = false;
        },
        error => {
          this.notifier.error('Wystąpił błąd podczas zapisu zmian w komentarzu');
        }
    )
  }

}
