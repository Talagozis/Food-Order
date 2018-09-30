import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferModalPage } from './offer-modal';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OfferModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferModalPage),
    PipesModule
  ],
})
export class OfferModalPageModule {}
