import { Component, OnInit } from '@angular/core';
import { NotifierService } from "../../core/notifier.service";
import { CreateRecipe } from '../../shared/models/recipe/new-recipe';
import { RecipeService } from '../recipe.service';
import { IngredientQuantity } from '../../shared/models/ingredient-quantity/ingredient-quantity';

@Component({
  selector: 'fg-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent {
  recipe: CreateRecipe = new CreateRecipe();
	
  constructor(
      private recipes: RecipeService,
      private notifier: NotifierService
  ) { }

  ngOnInit() {
    console.log(this.recipe);
    this.recipe.createIngredientQuantities = [];
    this.recipe.createIngredientQuantities.push(new IngredientQuantity());
  }

  addIngredient(ingredient = undefined) {
    let i = 0;
    if (typeof ingredient !== "undefined") {
      i = this.recipe.createIngredientQuantities.indexOf(ingredient);
    }
    this.recipe.createIngredientQuantities.splice(i, 0, new IngredientQuantity());
  }

  removeIngredient(ingredient) {
    let i = this.recipe.createIngredientQuantities.indexOf(ingredient);
    this.recipe.createIngredientQuantities.splice(i, 1);

    if (this.recipe.createIngredientQuantities.length === 0) {
      this.addIngredient();
    }
  }

  addRecipe() {
    console.log(this.recipe);
  }
}