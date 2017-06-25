import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../shared/models/recipe/recipe';

@Component({
  selector: 'fg-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.sass']
})
export class RecipeTileComponent implements OnInit {
  @Input()
  recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

  get fitness(): string {
    const value = Math.round(this.recipe.fitness * 100);
    return `${value}%`;
  }

  get stars(): number[] {
    if(this.recipe.rating)
      return Recipe.getIntStars(this.recipe.rating)
    else
      return new Array(5).fill(0);
  }
}
