import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from "@angular/router";
import { NotifierService } from "../../core/notifier.service";
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

  constructor(
    private route: ActivatedRoute,
    private recipes: RecipeService,
    private notifier: NotifierService
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
}
