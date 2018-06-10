import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductModalPage } from './product-modal';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ProductModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductModalPage),
    PipesModule
  ],
})
export class ProductModalPageModule {}
