import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../shared/models/recipe/recipe';
import { Tag } from '../../shared/models/tag';
import { CookbookService } from '../cookbook.service';
import { NotifierService } from "../../core/notifier.service";

@Component({
  selector: 'fg-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.sass'],
})
export class CookbookComponent implements OnInit {
  public recipes: Recipe[] = [];
  public tags: Tag[] = [];
  public findRecipeInput: string;
  public findRecipeSelect: string;
  public loading: string;

  constructor(
    private router: Router,
    private cookbook: CookbookService,
    private notifier: NotifierService
  ) { }

  ngOnInit() {
    this.loading = "Wczytywanie przepisów...";

    this.cookbook.getRecipes().subscribe(
      recipes => {
        if(recipes.length === 0) this.loading = "Brak przepisów...";
        this.recipes = recipes;
      },
      error => {
        this.notifier.error('Błąd przy wczytywaniu przepisów...');
        this.loading = "Bład przy wczytywaniu przepisów...";
      }
    );

    this.cookbook.getTags().subscribe(
      tags => this.tags = tags,
      error => console.log(error)
    );

    this.findRecipeSelect = "";
  }

  onRecipeClick(id: string) {
    this.router.navigate(['/recipe', id]);
  }
}
