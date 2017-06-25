import { Component, OnInit, Output } from '@angular/core';
import { FridgeService } from '../fridge.service';
import { NotifierService } from '../../core/notifier.service';
import { IngredientQuantity } from '../../shared/models/ingredient-quantity/ingredient-quantity';
import { EditProductService } from '../edit-product/edit-product.service';

@Component({
  selector: 'fg-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent {
  rows: IngredientQuantity[] = [];
  selected = [];
  constructor(
    private notifier: NotifierService,
    private fridge: FridgeService,
    private editPopup: EditProductService
  ) { }

  ngOnInit() {
    this.fridge.fridgeContent$
      .subscribe(content => {
        this.rows = content
      });
    this.fridge.fetchFridgeContent();
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  delete() {
    if (this.selected.length == 0)
      return false;

    this.fridge.delete(this.selected.splice(0))
      .subscribe(() => {
        this.notifier.success("Usunięto produkt(y) z lodówki!");
      }, (error) => {
        this.notifier.error(error);
      });
  }

  edit(row) {
    this.editPopup.show(row);
  }
}
