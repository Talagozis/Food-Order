import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayNameFormat',
})
export class DayNameFormatPipe implements PipeTransform {
  transform(value: string) {
    console.log(value);
    if (value == '0') {
      return 'Κυριακή';
    } else if (value == '1') {
      return 'Δευτέρα';
    } else if (value == '2') {
      return 'Τρίτη';
    } else if (value == '3') {
      return 'Τετάρτη';
    } else if (value == '4') {
      return 'Πέμπτη';
    } else if (value == '5') {
      return 'Παρασκευή';
    } else if (value == '6') {
      return 'Σάββατο';
    }
  }
}
