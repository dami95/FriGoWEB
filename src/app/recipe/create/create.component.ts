import { Component, OnInit } from '@angular/core';
import { NotifierService } from "../../core/notifier.service";
import { CreateRecipe } from '../../shared/models/recipe/new-recipe';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/models/ingredient/ingredient';
import { IngredientService } from '../../core/ingredient.service';
import { IngredientQuantity } from '../../shared/models/ingredient-quantity/ingredient-quantity';
import { CookbookService } from '../../cookbook/cookbook.service';
import { Tag } from '../../shared/models/tag';
import { endpoints } from '../../shared/endpoints';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'fg-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent {
  tags: Tag[] = [];
  ingredients: Ingredient[] = [];
  recipe: CreateRecipe = new CreateRecipe();
  uploadUrl: string;
  uploadHeaders: any;
	
  constructor(
      private recipes: RecipeService,
      private notifier: NotifierService,
      private ingredientsService: IngredientService,
      private cookbook: CookbookService,
      private api: ApiService
  ) { }

  ngOnInit() {
    this.ingredientsService.getIngredients().subscribe(
        ingredients => this.ingredients = ingredients
    );

    this.cookbook.getTags().subscribe(
        tags => this.tags = tags,
    );

    this.recipe.createIngredientQuantities = [];
    this.recipe.tags = [];

    this.addIngredient(0);

    this.uploadUrl = this.api.getUrl('Image');
    this.uploadHeaders = [ this.api.getHeaders() ];
  }

  addIngredient(i) {
    this.recipe.createIngredientQuantities.splice(i, 0, new IngredientQuantity());
  }

  removeIngredient(i) {
    this.recipe.createIngredientQuantities.splice(i, 1);

    if (this.recipe.createIngredientQuantities.length === 0) {
      this.addIngredient(0);
    }
  }

  trackByIndex(index: number, value: number) {
    return index;
  }

  addRecipe() {
    this.recipes.createRecipe(this.recipe)
        .subscribe(() => {
          this.notifier.success("Dodano przepis!");
        }, (error) => {
          this.notifier.error(error);
        });
  }

  imageUploaded(e, serverResponse) {
    this.recipe.imageUrl = e.serverResponse._body
  }
}