import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../services/card-service.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  cardName = new FormControl('');
  isTitleFormShowed = false;
  private color: string;
  constructor() { }

  ngOnInit() {
    this.color = `${this.card.color} solid 0.15rem`;
  }


  showTitleForm() {
    this.isTitleFormShowed = true;
  }

  submitNewCardName($event: KeyboardEvent) {
    if (this.cardName.value === '' || this.cardName.value === null) {
      return;
    }
    if ($event !== undefined) {
      if ($event.key !== 'Enter') {
        return;
      }
    }

    this.card.title = this.cardName.value.trim();
    this.cardName.reset();
    this.isTitleFormShowed = false;

  }
}
