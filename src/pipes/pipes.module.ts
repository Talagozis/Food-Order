import { NgModule } from '@angular/core';
import { DayNameFormatPipe } from './day-name-format/day-name-format';
import { PriceFormatPipe } from './price-format/price-format';
import { ImageStorePipe } from './image-store/image-store';
import { ImageContactTypePipe } from './image-contactType/image-contactType';

@NgModule({
    declarations: [DayNameFormatPipe,
        PriceFormatPipe,
        ImageStorePipe,
        ImageContactTypePipe,
    ],
    imports: [],
    exports: [DayNameFormatPipe,
        PriceFormatPipe,
        ImageStorePipe,
        ImageContactTypePipe,
    ]
})
export class PipesModule { }
