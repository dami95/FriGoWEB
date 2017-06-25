import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IngredientQuantity }
  from '../../shared/models/ingredient-quantity/ingredient-quantity';

@Injectable()
export class EditProductService {
  private showEditSource = new Subject<IngredientQuantity>();
  showEdit$ = this.showEditSource.asObservable();

  constructor() { }

  show(model: IngredientQuantity) {
    this.showEditSource.next(model);
  }
}
