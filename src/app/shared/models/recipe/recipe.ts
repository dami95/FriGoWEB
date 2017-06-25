import { Comment } from '../comment/comment';
import { IngredientQuantity } from '../ingredient-quantity/ingredient-quantity';
import { Tag } from '../tag';
import { UserStub } from '../stubs/user.stub';
import { Note } from '../note/note';

export class Recipe {
  id?: string;
  title?: string;
  description?: string;
  ingredientQuantities?: IngredientQuantity[];
  comments?: Comment[];
  notes?: Note[];
  tags?: Tag[];
  user?: UserStub;
  imageUrl?: string;
  rating?: number;
  createdAt?: Date;
  fitness?: number;
  missingIngredientQuantities?: IngredientQuantity[];

  static getIntStars(rating: number): number[] {
    return [
      ...Array(rating).fill(true),
      ...Array(10-rating).fill(false)
    ].reduce((previous, current, index, array) => {
      if(!previous) previous = [];
      if(index % 2 == 0)
        previous.push(current + array[index + 1])
      return previous;
    }, []);
  }
}
