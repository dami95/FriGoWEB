import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'FindRecipeByCategory'
})

export class FindRecipeByCategory implements PipeTransform {
  transform(items: any[], value: string) {
    if (!value) {
      return items;
    } else {
      return items.filter(item => item.tags.map(tag => tag.id).indexOf(value) > -1);
    }
  }
}
