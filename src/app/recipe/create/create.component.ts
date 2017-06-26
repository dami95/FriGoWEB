import { Component, OnInit } from '@angular/core';
import { NotifierService } from "../../core/notifier.service";
import { CreateRecipe } from '../../shared/models/recipe/new-recipe';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/models/ingredient/ingredient';
import { IngredientService } from '../../core/ingredient.service';
import { NewIngredientQuantity } from '../../shared/models/ingredient-quantity/new-ingredient-quantity';
import { CookbookService } from '../../cookbook/cookbook.service';
import { Tag } from '../../shared/models/tag';
import { endpoints } from '../../shared/endpoints';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';

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
      private api: ApiService,
      private router: Router
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
    this.recipe.createIngredientQuantities.splice(i, 0, new NewIngredientQuantity());
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
        .subscribe(
          (recipe) => {
            this.notifier.success("Dodano przepis!");
            this.router.navigate(['/recipe', recipe.id])
        }, (error) => {
          this.notifier.error(error);
        });
  }

  imageUploaded(e, serverResponse) {
    this.recipe.imageUrl = e.serverResponse._body.replace(/^"|"$/g, '');
    const lastIndex = this.recipe.imageUrl.lastIndexOf('/');
    this.recipe.imageId = this.recipe.imageUrl.slice(lastIndex+1);
  }

  getUnitName(ingredientId: string) {
    return this.ingredients
      .filter(item => item.id == ingredientId)
      .map(ingredient => ingredient.unit.name)[0];
  }
}
