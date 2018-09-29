import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'countdown',
})
export class CountdownPipe implements PipeTransform {
	/**
	 * Takes a value and makes it lowercase.
	 */
	transform(value: Date | string, ...args): string {
		if (typeof value == "string")
			value = new Date(value);

		var ms: number = value.valueOf() - new Date().valueOf();

		var hours: string = ("0" + Math.floor(ms / 3600000)).slice(-2);
		var mins: string = ("0" + Math.floor((ms % 3600000) / 60000)).slice(-2);

		return  hours + " ώρες και " + mins + " λεπτά";
	}
}
