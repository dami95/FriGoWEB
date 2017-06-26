import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'FindRecipeByName'
})

export class FindRecipeByName implements PipeTransform {
  transform(items: any[], value: string) {
    if (!value) {
      return items;
    } else {
      return items.filter(
          item => item.title !== undefined && item.title.indexOf(value) !== -1
        );
    }
  }
}
