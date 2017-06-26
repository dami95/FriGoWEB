import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ImageUploadModule } from 'angular2-image-upload';

import { RecipeRoutingModule } from './recipe-routing.module';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { CreateComponent } from './create/create.component';
import { RecipeService } from './recipe.service';
import { NoteTileComponent } from './note-tile/note-tile.component';
import { NotesComponent } from './notes/notes.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentTileComponent } from './comment-tile/comment-tile.component';
import { CookbookService } from '../cookbook/cookbook.service';
import { SafePipe } from './safe.pipe';

@NgModule({
  imports: [
    SharedModule,
    RecipeRoutingModule,
    ImageUploadModule
  ],
  declarations: [ SingleRecipeComponent, CreateComponent, NoteTileComponent, NotesComponent, CommentsComponent, CommentTileComponent, SafePipe ],
  exports: [ CreateComponent ],
  providers: [ RecipeService, CookbookService ]
})
export class RecipeModule { }
