import { NgModule } from '@angular/core';
import { DayNameFormatPipe } from './day-name-format/day-name-format';
import { PriceFormatPipe } from './price-format/price-format';
@NgModule({
	declarations: [DayNameFormatPipe,
    PriceFormatPipe],
	imports: [],
	exports: [DayNameFormatPipe,
    PriceFormatPipe]
})
export class PipesModule {}
