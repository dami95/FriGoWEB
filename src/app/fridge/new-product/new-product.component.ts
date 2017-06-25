import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { NewIngredientQuantity } from '../../shared/models/ingredient-quantity/new-ingredient-quantity';
import { Ingredient } from '../../shared/models/ingredient/ingredient';
import { FridgeService } from '../fridge.service';
import { IngredientService } from '../../core/ingredient.service';
import { FridgeComponent } from '../fridge/fridge.component';
import { NotifierService } from '../../core/notifier.service';

@Component({
  selector: 'fg-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['../product.component.sass']
})
export class NewProductComponent implements OnInit {
  ingredients: Ingredient[] = [];
  ingredientQuantity = new NewIngredientQuantity();
  private _selectedIngredient: Ingredient;
  private _visible: boolean;
  @ViewChild('background')
  background;
  @Output()
  visibleChange = new EventEmitter<boolean>();

  constructor(
    private fridge: FridgeService,
    private ingredientsService: IngredientService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.ingredientsService.getIngredients().subscribe(
      ingredients => this.ingredients = ingredients
    );
  }

  create() {
    this.fridge.createItem(this.ingredientQuantity)
       .subscribe(() => {
        this.notifier.success("Dodano produkt do lodówki!");
        this.clear();
      }, (error) => {
        this.notifier.error(error);
      });
  }

  getUnit() {
    if(this.selectedIngredient)
      return this.selectedIngredient.unit.name;
  }

  get visible(): boolean {
    return this._visible;
  }

  @Input()
  set visible(value: boolean) {
    if(value && !this._visible)
      this.clear();
    this._visible = value;
  }

  get selectedIngredient() {
    return this._selectedIngredient;
  }

  set selectedIngredient(value: Ingredient) {
    this.ingredientQuantity.ingredientId = value.id;
    this._selectedIngredient = value;
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  backgroundClick(event) {
    if(event.target == this.background.nativeElement)
      this.close();
  }

  clear() {
    this.ingredientQuantity = new NewIngredientQuantity();
    this._selectedIngredient = null;
  }
}
