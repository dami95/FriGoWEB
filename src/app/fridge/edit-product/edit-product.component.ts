import { Component, OnInit, ViewChild } from '@angular/core';
import { EditIngredientQuantity }
  from '../../shared/models/ingredient-quantity/edit-ingredient-quantity';
import { Ingredient } from '../../shared/models/ingredient/ingredient';
import { EditProductService } from './edit-product.service';
import { NotifierService } from '../../core/notifier.service';
import { FridgeService } from '../fridge.service';

@Component({
  selector: 'fg-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['../product.component.sass']
})
export class EditProductComponent implements OnInit {
  ingredientQuantity: EditIngredientQuantity;
  private ingredient: Ingredient;
  private id: string;
  private visible: boolean = false;
  @ViewChild('background')
  background;

  constructor(
    private editService: EditProductService,
    private notifier: NotifierService,
    private fridge: FridgeService
  ) { }

  ngOnInit() {
    this.editService.showEdit$.subscribe(
      (model) => {
        this.ingredientQuantity = new EditIngredientQuantity();
        this.ingredientQuantity.description = model.description;
        this.ingredientQuantity.quantity = model.quantity;
        this.id = model.id;
        this.ingredient = model.ingredient;
        this.open();
      }
    )
  }

  edit() {
    this.fridge.editItem(this.id, this.ingredientQuantity)
       .subscribe(() => {
        this.notifier.success("Pomyślnie edytowano produkt!");
        this.close();
      }, (error) => {
        this.notifier.error(error);
      });
  }

  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  backgroundClick(event) {
    if(event.target == this.background.nativeElement)
      this.close();
  }
}
