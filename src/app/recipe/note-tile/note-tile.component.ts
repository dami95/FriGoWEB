import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe';
import { RecipeService } from '../recipe.service';
import { NotifierService } from "../../core/notifier.service";
import { Note } from '../../shared/models/note/note';

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

  isEditing: boolean;
  editModel: string;

  constructor(
    private recipes: RecipeService,
    private notifier: NotifierService
  ) {
  }

  ngOnInit() {
    this.isEditing = false;
    this.editModel = this.note.note;
  }

  ifNotesEditable() {
    return localStorage.getItem('userName') === this.recipe.user.userName;
  };

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
    this.recipes.editNote(this.note.id, this.editModel).subscribe(
      note => {
        this.note = note;
        this.notifier.success('Pomyślnie zapisano zmiany w notatce');
        this.isEditing = false;
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
