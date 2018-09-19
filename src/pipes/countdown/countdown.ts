import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown',
})
export class CountdownPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Date, ...args): Date {
    console.log(new Date().valueOf());
    console.log(value.valueOf());
    return new Date(value.valueOf() - new Date().valueOf());
  }
}
