import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoresPage } from './stores';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    StoresPage,
  ],
  imports: [
    IonicPageModule.forChild(StoresPage),
    PipesModule
  ],
  exports: [
    StoresPage
  ]
})
export class StoresPageModule {}
