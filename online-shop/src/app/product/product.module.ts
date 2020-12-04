import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product/new-product.component';
import { RouterModule } from '@angular/router';
import { ProductRouterModule } from './product-routin.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NewProductComponent,
    ProductItemComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ProductRouterModule
  ],
  exports: [
    ProductItemComponent
  ]
})
export class ProductModule { }
