import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferModalPage } from './offer-modal';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    OfferModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferModalPage),
    PipesModule,
    ComponentsModule
  ],
})
export class OfferModalPageModule {}
