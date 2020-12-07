import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ImageValidatorDirective } from './image-validator.directive';
import { TimeDiffPipe } from './time-diff.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    ImageValidatorDirective,
    TimeDiffPipe],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    ImageValidatorDirective,
    TimeDiffPipe
  ]
})
export class SharedModule { }
