import { NgModule } from '@angular/core';
import { DayNameFormatPipe } from './day-name-format/day-name-format';
import { PriceFormatPipe } from './price-format/price-format';
import { ImageStorePipe } from './image-store/image-store';
import { ImageContactTypePipe } from './image-contactType/image-contactType';
import { ImageProductPipe } from './image-product/image-product';
import { CountdownPipe } from './countdown/countdown';
import { ImageOfferPipe } from './image-offer/image-offer';

@NgModule({
	declarations: [DayNameFormatPipe,
		PriceFormatPipe,
		ImageStorePipe,
		ImageContactTypePipe,
		ImageProductPipe,
		ImageOfferPipe,
		CountdownPipe,
	],
	imports: [],
	exports: [DayNameFormatPipe,
		PriceFormatPipe,
		ImageStorePipe,
		ImageContactTypePipe,
		ImageProductPipe,
		ImageOfferPipe,
		CountdownPipe,
	]
})
export class PipesModule { }
