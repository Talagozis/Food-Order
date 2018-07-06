import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThankYouPage } from './thank-you';

@NgModule({
  declarations: [
    ThankYouPage,
  ],
  imports: [
    IonicPageModule.forChild(ThankYouPage),
  ],
})
export class ThankYouPageModule {}
