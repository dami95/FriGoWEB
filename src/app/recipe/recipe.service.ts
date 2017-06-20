import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe/recipe';
import { Observable } from 'rxjs/Observable';
import { RecipesMock } from '../cookbook/recipes.mock';
import { endpoints } from '../shared/endpoints';
import { ApiService } from '../core/api.service';
import { Note } from '../shared/models/note/note';

import 'rxjs/add/observable/of';

@Injectable()
export class RecipeService {
    constructor(
        private api: ApiService
    ) { }

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

    rate(id, rateRecipe) : Observable<number> {
        return this.api.put(
            endpoints.rate + `/${id}`,
            rateRecipe
        );
    }
}
