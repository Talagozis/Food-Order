import { NgModule } from '@angular/core';
import { DayNameFormatPipe } from './day-name-format/day-name-format';
import { PriceFormatPipe } from './price-format/price-format';
import { ImageStorePipe } from './image-store/image-store';
import { ImageContactTypePipe } from './image-contactType/image-contactType';
import { ImageProductPipe } from './image-product/image-product';

@NgModule({
    declarations: [DayNameFormatPipe,
        PriceFormatPipe,
        ImageStorePipe,
        ImageContactTypePipe,
        ImageProductPipe,
    ],
    imports: [],
    exports: [DayNameFormatPipe,
        PriceFormatPipe,
        ImageStorePipe,
        ImageContactTypePipe,
        ImageProductPipe,
    ]
})
export class PipesModule { }
