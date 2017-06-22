import { Component, OnInit } from '@angular/core';
import { NotifierService } from "../../core/notifier.service";
import { CreateRecipe } from '../../shared/models/recipe/new-recipe';
import { RecipeService } from '../recipe.service';

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
  }

  addRecipe() {
    //console.log(this.createRecipe);
  }
}