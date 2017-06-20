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

    // getRecipe(id): Observable<Recipe> {
    //     return Observable.of(
    //       RecipesMock.find((recipe) => {
    //         return recipe.id === id;
    //       })
    //     );
    // }

    getRecipe(id): Observable<Recipe> {
        return this.api.get(
          endpoints.recipes + '/' + id
        ).do(recipe => { return Observable.of(recipe)});
    }

    removeNote(id): Observable<string> {
        return this.api.delete(
          endpoints.notes + `/${id}`
        ).do(status => { return Observable.of(status) })
    }

    editNote(id, editRecipeNote) : Observable<Note> {
        return this.api.put(
            endpoints.notes,
            `id=${id}&editRecipeNote=${editRecipeNote}`
        ).do(note => { return Observable.of(note); })
    }

    removeComment(id) : Observable<string> {
        return this.api.delete(
            endpoints.comments + `/${id}`
        ).do(status => {return Observable.of(status)});
    }

    editComment(id, editComment) : Observable<Comment> {
        return this.api.put(
            endpoints.comments,
            `id=${id}&editComment=${editComment}`
        ).do(comment => { return Observable.of(comment); })
    }

    rate(id, rateRecipe) : Observable<number> {
        return this.api.put(
            endpoints.rate,
            `id=${id}&rateRecipe=${rateRecipe}`
        )
            .do(
                response => {
                    return Observable.of(response)
                }
            )
    }
}
