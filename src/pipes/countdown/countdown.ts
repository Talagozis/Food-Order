import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'countdown',
})
export class CountdownPipe implements PipeTransform {


	transform(value: Date | string, ...args): string {
		if (typeof value === "string") {
			value = new Date(value);
		}

		// console.log(value);
		// console.log(new Date());

		const ms: number = value.valueOf() - new Date().valueOf();

		const hours: number = Math.floor(ms / 3600000);
		const mins: number = Math.floor((ms % 3600000) / 60000);

		const hoursText: string = hours + " ώρες και ";
		const minsText: string = mins + " λεπτά";

		return hours !== 0 ? hoursText + minsText : minsText;
	}
}
