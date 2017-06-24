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
    userRating: boolean[];
    rated: boolean;
    recipe: Recipe;

    constructor(
      private route: ActivatedRoute,
      private recipes: RecipeService,
      private notifier: NotifierService
    ) {
    this.userRating = new Array(5).fill(false);
    this.rated = false;
    }

    ngOnInit() {
        let recipeID = this.route.snapshot.params['id'];
        this.recipes.getRecipe(recipeID).subscribe(
            recipe => this.recipe = recipe,
            error => console.log(error)
        );
    }

    get getAvailableIngredientsRatio(): string {
      let available = this.recipe.ingredientQuantities;
      let missing = this.recipe.missingIngredientQuantities;

      if(available && missing){
          let ratio = available.length / (available.length + missing.length);

          return ratio * 100 + '%';
      }
      else return 'Brak danych';
  };

    get stars(): boolean[] {
        if(this.recipe)
            return [
                ...Array(this.recipe.rating).fill(true),
                ...Array(5-this.recipe.rating).fill(false)
            ];
        else
            return new Array(5).fill(false);
};

    //@TODO jak będą notatki dodane do modelu
    // removeNote(index) {
    //     let note;
    //
    //     if('notes' in this.recipe) {
    //
    //         this.recipes.removeNote(note);
    //     }
    // }

    rate(i) {
        if(this.rated === false) {
            let rating = i+1;
            let self = this;

            this.recipes.rate(this.recipe.id, { "Rate": rating }).subscribe(
                response => {
                    self.notifier.success('Dziękujemy za ocenę przepisu');
                    self.userRating = [
                        ...Array(rating).fill(true),
                        ...Array(5 - rating).fill(false)
                    ];
                    self.rated = true;
                },
                error => {
                    self.notifier.error('Nie udało sie przesłać Twojej oceny');
                }
            )

        }
    }
}

