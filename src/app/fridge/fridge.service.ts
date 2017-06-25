import { Injectable } from '@angular/core';
import { IngredientQuantityMock } from './ingredient-quantity.mock';
import { ApiService } from '../core/api.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NewIngredientQuantity } from '../shared/models/ingredient-quantity/new-ingredient-quantity';
import { IngredientQuantity } from '../shared/models/ingredient-quantity/ingredient-quantity';
import { endpoints } from '../shared/endpoints';

@Injectable()
export class FridgeService {
  private fridgeContentSource = new Subject<IngredientQuantity[]>();
  fridgeContent$ = this.fridgeContentSource.asObservable();

  constructor(
    private api: ApiService
  ) { }

  fetchFridgeContent(): void {
    this.api.get(endpoints.ingredientQuantity).subscribe(
      (next) => this.fridgeContentSource.next(next),
      (error) => this.fridgeContentSource.error(error)
    );
  }

  getIngredientQuantity(): Observable<IngredientQuantity[]> {
    return Observable.of(IngredientQuantityMock);
  }

  createItem(ingredientQuantity: NewIngredientQuantity): Observable<IngredientQuantity> {
    return this.api.post(endpoints.ingredientQuantity, ingredientQuantity).do(() => {
      this.fetchFridgeContent();
    });
  }

  delete(toDelete: IngredientQuantity[]): Observable<null> {
    if(toDelete && toDelete.length > 0) {
      let observable = this.api
        .delete(endpoints.ingredientQuantity + '/' + toDelete[0].id);
      for(let i = 1; i < toDelete.length; i++) {
        observable = observable.merge(
          this.api.delete(endpoints.ingredientQuantity + '/' + toDelete[i].id)
        );
      }
      return observable.finally(() => this.fetchFridgeContent()).last();
    } else {
      return Observable.of(null);
    }
  }
}
