import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe/recipe';
import { Tag } from '../shared/models/tag';
import { Observable } from 'rxjs/Observable';
import { RecipesMock } from './recipes.mock';
import { TagsMock } from './tags.mock';
import { ApiService } from '../core/api.service';
import { endpoints } from '../shared/endpoints';

@Injectable()
export class CookbookService {
  constructor(
      private api: ApiService
  ) { }

  // getRecipes(): Observable<Recipe[]> {
  //   return Observable.of(RecipesMock);
  // }
  //
  // getTags() : Observable<Tag[]> {
  //   return Observable.of(TagsMock);
  // }

  getRecipes(): Observable<Recipe[]> {
      return this.api.get(endpoints.recipes)
          .do(recipes => { return Observable.of(recipes)});
  }

  getTags(): Observable<Tag[]> {
      return this.api.get(endpoints.tags)
          .do(tags => { return Observable.of(tags) });
  }
}
