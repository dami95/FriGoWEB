import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './fridge/fridge.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FridgeService } from './fridge.service';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditProductService } from './edit-product/edit-product.service';


@NgModule({
  imports: [
    SharedModule,
    FridgeRoutingModule,
    NgxDatatableModule
  ],
  declarations: [FridgeComponent, ProductListComponent, NewProductComponent, EditProductComponent],
  providers: [FridgeService, EditProductService]
})
export class FridgeModule {


}
