import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'priceFormat',
})
export class PriceFormatPipe implements PipeTransform {
	transform(value: string, numberOfDecimals?: number) {
		if(!numberOfDecimals)
			numberOfDecimals = 2;
		return parseFloat(value).toFixed(numberOfDecimals) + '€';
	}
}
