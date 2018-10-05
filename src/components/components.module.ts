import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OfferGroupComponent } from './offer-group/offer-group';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular'
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations: [OfferGroupComponent],
	imports: [
		CommonModule,
		IonicModule,
		PipesModule
	],
	exports: [OfferGroupComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
