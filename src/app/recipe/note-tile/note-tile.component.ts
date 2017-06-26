import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe';
import { RecipeService } from '../recipe.service';
import { NotifierService } from '../../core/notifier.service';
import { UserService } from '../../core/user.service';
import { Note } from '../../shared/models/note/note';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fg-note-tile',
  templateUrl: './note-tile.component.html',
  styleUrls: ['./note-tile.component.sass']
})
export class NoteTileComponent implements OnInit {
  @Input()
    recipe: Recipe;
  @Input()
    note: Note;
  @Input()
    noteIndex: number;
  @Input()
    isNew: boolean;

  isEditing: boolean;
  editModel: string;

  constructor(
    private recipes: RecipeService,
    private notifier: NotifierService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    if(this.isNew)
      this.isEditing = true;
    else
      this.isEditing = false;
    this.editModel = this.note.note;
  }

  isNotesEditable() {
    return true;
  }

  removeNote() {
    if(confirm('Czy na pewno chcesz usunąć komentarz?')) {
      this.recipes.removeNote(this.note.id).subscribe(
        status => {
          this.recipe.notes.splice(this.noteIndex, 1);
          this.notifier.success('Notatka została usunięta');
        },
        error => {
          this.notifier.error('Wystąpił błąd podczas usuwania notatki');
        }
      );
    }
  }

  editNote() {
    this.isEditing = true;
  }

  saveNote() {
    let action: Observable<any>;
    if(this.isNew) {
      action = this.recipes.addNote({ note: this.editModel, recipeId: this.recipe.id});
    } else {
      action = this.recipes.editNote(this.note.id, { "Note": this.editModel })
    }
    action.subscribe(
      note => {
        this.note = note;
        let successText =
          this.isNew ? 'Pomyślnie zapisano notatkę!' : 'Pomyślnie zapisano zmiany w notatce';
        this.notifier.success(successText);
        this.isEditing = false;
        this.isNew = false;
      },
      error => {
        this.notifier.error('Wystąpił błąd podczas zapisu zmian w notatce');
      }
    )
  }

  cancelEditing() {
    if(confirm('Czy na pewno chcesz odrzucić zmiany?')) {
      this.isEditing = false;
      this.editModel = this.note.note;
    }
  }
}
