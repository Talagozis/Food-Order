import { Pipe, PipeTransform } from '@angular/core';
import { ENV } from '@app/env'

@Pipe({
	name: 'imageContactType',
})
export class ImageContactTypePipe implements PipeTransform {
	transform(value: string, ...args) {
		return ENV.API_IMAGE_URL + "contact-type/" + value;
	}
}
