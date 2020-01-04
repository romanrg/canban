import { Pipe, PipeTransform } from '@angular/core';
import {Card} from '../services/card-service.service';

const MAX_TITLE_LENGTH = 80;

@Pipe({
  name: 'cardTitle'
})
export class CardTitlePipe implements PipeTransform {

  transform(card: Card, ...args: any[]): string {
    if (card.title.length > MAX_TITLE_LENGTH) {
      return `${card.title.substr(0, MAX_TITLE_LENGTH)}...`;
    }
    return card.title;
  }
}
