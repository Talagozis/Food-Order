import { NgModule } from '@angular/core';
import { DayNameFormatPipe } from './day-name-format/day-name-format';
import { PriceFormatPipe } from './price-format/price-format';
import { ImageStorePipe } from './image-store/image-store';
@NgModule({
    declarations: [DayNameFormatPipe,
        PriceFormatPipe,
        ImageStorePipe],
    imports: [],
    exports: [DayNameFormatPipe,
        PriceFormatPipe,
        ImageStorePipe]
})
export class PipesModule { }
