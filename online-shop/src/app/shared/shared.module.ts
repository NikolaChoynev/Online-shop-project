import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ImageValidatorDirective } from './image-validator.directive';



@NgModule({
  declarations: [LoaderComponent, ImageValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    ImageValidatorDirective
  ]
})
export class SharedModule { }
