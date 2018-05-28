import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorePage } from './store';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		StorePage
	],
	imports: [
		IonicPageModule.forChild(StorePage),
		PipesModule
	],
})
export class StorePageModule { }
