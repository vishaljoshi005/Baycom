import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserValidatorsDirective } from './validators/user-validators.directive';

@NgModule({
  declarations: [UserValidatorsDirective],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
