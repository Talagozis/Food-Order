import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThankYouPage } from './thank-you';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ThankYouPage,
  ],
  imports: [
    IonicPageModule.forChild(ThankYouPage),
    PipesModule
  ],
})
export class ThankYouPageModule {}
