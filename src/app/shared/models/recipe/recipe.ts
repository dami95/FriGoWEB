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
  base64Picture?: string;
  rating?: number;
  createdAt?: Date;
  fitness?: number;
  missingIngredientQuantities?: IngredientQuantity[];
}
