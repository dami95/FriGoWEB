import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe';
import { Note } from '../../shared/models/note/note';
@Component({
  selector: 'fg-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {
  @Input()
  recipe: Recipe;
  @Input()
  notesOpen: boolean;
  @Output()
  notesOpenChange = new EventEmitter<boolean>();

  constructor() {
    this.notesOpen = false;
  }

  ngOnInit() {
  }

  changeNotesState() {
    this.notesOpen = !this.notesOpen;
    this.notesOpenChange.emit(this.notesOpen);
  }
}
