import { Pipe, PipeTransform } from '@angular/core';
import { ENV } from '@app/env';

@Pipe({
	name: 'imageStore',
})
export class ImageStorePipe implements PipeTransform {
	transform(value: string, ...args) {
		if (value && /\S/.test(value)) {
			return ENV.IMAGE_URL + "image/store/" + value;
		}
		return ENV.IMAGE_URL + 'content/global/img/no-image-available-store.png';
	}
}
