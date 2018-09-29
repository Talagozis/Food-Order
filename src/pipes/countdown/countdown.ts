import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'countdown',
})
export class CountdownPipe implements PipeTransform {

	
	transform(value: Date | string, ...args): string {
		if (typeof value == "string")
			value = new Date(value);

		// console.log(value);
		// console.log(new Date());

		var ms: number = value.valueOf() - new Date().valueOf();

		var hours: number = Math.floor(ms / 3600000);
		var mins: number = Math.floor((ms % 3600000) / 60000);

		var hoursText: string = hours + " ώρες και ";
		var minsText: string = mins + " λεπτά";

		return hours !== 0 ? hoursText + minsText : minsText;
	}
}
