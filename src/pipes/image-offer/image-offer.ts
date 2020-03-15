import { Pipe, PipeTransform } from '@angular/core';
import { ENV } from '@app/env';

@Pipe({
	name: 'imageOffer',
})
export class ImageOfferPipe implements PipeTransform {

	transform(value: string, ...args) {
		if (value && /\S/.test(value)) {
			return ENV.IMAGE_URL + "image/offer/" + value;
		}
		return ENV.IMAGE_URL + 'content/global/img/no-image-available-offer.png';
	}
}
