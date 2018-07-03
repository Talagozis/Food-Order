import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from './checkout';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutPage),
    PipesModule
  ],
})
export class CheckoutPageModule {}
