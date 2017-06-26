import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe/recipe';
import { CreateRecipe } from '../shared/models/recipe/new-recipe';
import { Observable } from 'rxjs/Observable';
import { endpoints } from '../shared/endpoints';
import { ApiService } from '../core/api.service';
import { Note } from '../shared/models/note/note';

import 'rxjs/add/observable/of';

@Injectable()
export class RecipeService {
  constructor(
    private api: ApiService
  ) { }

  createRecipe(newRecipe): Observable<Recipe> {
    return this.api.post(
      endpoints.recipes,
      newRecipe
    );
  }

  getRecipe(id): Observable<Recipe> {
    return this.api.get(
      endpoints.recipes + `/${id}`
    );
  }

  removeNote(id): Observable<string> {
    return this.api.delete(
      endpoints.notes + `/${id}`
    );
  }

  editNote(id, editRecipeNote) : Observable<Note> {
    return this.api.put(
      endpoints.notes + `/${id}`,
      editRecipeNote
    );
  }

  addNote(note) : Observable<Note> {
    return this.api.post(
      endpoints.notes,
      note
    );
  }

  removeComment(id) : Observable<string> {
    return this.api.delete(
      endpoints.comments + `/${id}`
    );
  }

  editComment(id, editComment) : Observable<Comment> {
    return this.api.put(
      endpoints.comments + `/${id}`,
      editComment
    );
  }

  addComment(comment) : Observable<Comment> {
    return this.api.post(
      endpoints.comments,
      comment
    );
  }

  rate(id, rateRecipe) : Observable<number> {
    return this.api.put(
      endpoints.rate + `?recipeId=${id}`,
      rateRecipe
    );
  }

  uploadImage(image) {

  }
}
