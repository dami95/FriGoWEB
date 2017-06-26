import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe';
import { IngredientQuantity } from '../../shared/models/ingredient-quantity/ingredient-quantity';
import { Note } from '../../shared/models/note/note';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from "@angular/router";
import { NotifierService } from "../../core/notifier.service";
import { UserService } from '../../core/user.service';
import { element } from "protractor";

@Component({
  selector: 'fg-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.sass']
})
export class SingleRecipeComponent{
  userRating: number[];
  rated: boolean;
  recipe: Recipe;
  notesOpen = false;

  constructor(
    private route: ActivatedRoute,
    private recipes: RecipeService,
    private notifier: NotifierService,
    private userService: UserService
  ) {
    this.userRating = new Array(5).fill(0);
    this.rated = false;
  }

  ngOnInit() {
    let recipeID = this.route.snapshot.params['id'];
    this.recipes.getRecipe(recipeID).subscribe(
      recipe => {
        this.recipe = recipe
        if(recipe.userRating) {
          this.rated = true;
          this.userRating = Recipe.getIntStars(recipe.userRating);
        }
      },
      error => console.log(error)
    );
  }

  get getAvailableIngredientsRatio(): string {
    const fitness = (this.recipe.fitness * 100).toPrecision(4);
    return fitness + '%';
  };

  get stars(): number[] {
    return Recipe.getIntStars(this.recipe.rating);
  }

  addNote() {
    this.notesOpen = true;
    this.recipe.notes.push(new Note());
  }

  //@TODO jak będą notatki dodane do modelu
  // removeNote(index) {
  //   let note;
  //
  //   if('notes' in this.recipe) {
  //
  //     this.recipes.removeNote(note);
  //   }
  // }

  rate(i) {
    let rating = (i+1)*2;
    let self = this;

    this.recipes.rate(this.recipe.id, { "Rate": rating }).subscribe(
      response => {
        self.notifier.success('Dziękujemy za ocenę przepisu');
        self.userRating = Recipe.getIntStars(rating);
        self.rated = true;
      },
      error => {
        self.notifier.error('Nie udało sie przesłać Twojej oceny');
      }
    )
  }

  share() {
    window.open('https://www.facebook.com/sharer.php?u='+window.location, 'Udostępnij', 'width=500,height=400,resizable=true');
  }

  missing(ingredientQuantity: IngredientQuantity): number {
    return this.recipe.missingIngredientQuantities
      .filter(iq => iq.ingredient.id == ingredientQuantity.ingredient.id)
      .reduce((prev, curr) => prev += curr.quantity, 0);
  }

  get loggedin() {
    return this.userService.isLoggedIn();
  }
}
