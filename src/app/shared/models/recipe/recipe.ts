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
  userRating?: number;

  static getIntStars(rating: number): number[] {
    if(typeof rating !== 'number')
      return new Array(5).fill(0);
    rating = Math.round(rating);
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
