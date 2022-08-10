import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'urlHeroe',
})
export class UrlHeroePipe implements PipeTransform {
  transform(heroe: Heroe): string {
    const path = 'assets/';

    const urlOfImageHeroe = path + 'heroes/' + heroe.id + '.jpg';
    const urlNoImageHeroe = path + 'no-image.png';

    return heroe ? urlOfImageHeroe : urlNoImageHeroe;
  }
}
