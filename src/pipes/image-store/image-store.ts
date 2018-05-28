import { Pipe, PipeTransform } from '@angular/core';
import { ENV } from '@app/env'

@Pipe({
	name: 'imageStore',
})
export class ImageStorePipe implements PipeTransform {
	transform(value: string, ...args) {
		return ENV.API_IMAGE_URL + "store/" + value;
	}
}
