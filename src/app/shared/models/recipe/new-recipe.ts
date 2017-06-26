import { NewIngredientQuantity } from '../ingredient-quantity/new-ingredient-quantity';
import { Tag } from '../tag';

export class CreateRecipe {
  title: string;
  description: string;
  createIngredientQuantities: NewIngredientQuantity[];
  tags: Tag[];
  imageUrl: string;
  imageId: string;
}
