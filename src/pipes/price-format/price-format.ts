import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: string) {
    return parseFloat(value).toFixed(2) + '€';
  }
}
