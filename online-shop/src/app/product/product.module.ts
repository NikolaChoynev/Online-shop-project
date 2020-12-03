import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductComponent } from './new-product/new-product.component';
import { RouterModule } from '@angular/router';
import { ProductRouterModule } from './product-routin.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { DetailComponent } from './detail/detail.component';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    NewProductComponent,
    ProductItemComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductRouterModule
  ],
  exports: [
    ProductItemComponent
  ]
})
export class ProductModule { }
