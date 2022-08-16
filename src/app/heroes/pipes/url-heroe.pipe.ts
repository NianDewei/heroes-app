import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'urlHeroe',
})
export class UrlHeroePipe implements PipeTransform {
  transform(heroe: Heroe): string {
    const path = 'assets/';

    const imageHeroe = path + 'heroes/' + heroe.id + '.jpg';
    const noImageHeroe = path + 'no-image.png';

    if (!heroe.id && !heroe.alt_img) return noImageHeroe;
    if (heroe.alt_img) return heroe.alt_img;

    return heroe.alt_img || imageHeroe;
  }
}
