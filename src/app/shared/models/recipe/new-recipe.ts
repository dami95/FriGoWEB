import { IngredientQuantity } from '../ingredient-quantity/ingredient-quantity';
import { Tag } from '../tag';

export class CreateRecipe {
  title: string;
  description: string;
  createIngredientQuantities: IngredientQuantity[];
  tags: Tag[];
  imageUrl: string
}
