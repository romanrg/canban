import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Column} from '../services/column-service.service';
import {Card, CardServiceService} from '../services/card-service.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  @Output() cardTransfer = new EventEmitter();
  isDraggedOver = false;
  isTitleFormShowed = false;
  columnName = new FormControl('');
  cardTransfered: Card;
  constructor(
    private cardService: CardServiceService
  ) { }

  ngOnInit() {

  }

  onChanged(stopAt: number) {
    if (typeof stopAt === 'number') {
      this.column.stopAt = stopAt;
    }
  }

  transferCard(card: Card) {
    this.cardTransfer.emit(card);
  }

  handleCardDrop($event: DragEvent, id: string) {
    const drop = $event.dataTransfer.getData('text');
    try {
      const card = JSON.parse(drop);
      this.addAlreadyExistCard(card);
      this.toggleDrag();
      return;
    } catch (e) {

    }

    switch (drop) {
      case 'New Card':
        this.addNewCard();
        break;
      default :
        this.addStopAt();
        break;
    }

    this.toggleDrag();
  }


  private addNewCard() {
    if (this.column.cards.length < this.column.stopAt || this.column.stopAt === undefined) {
      this.column.cards.push(this.cardService.addNewCard());
    }
  }

  private handleDragOver($event: DragEvent) {
    $event.preventDefault();
    this.isDraggedOver = true;
  }

  private addStopAt() {
    this.column.stopAt = 5;
  }

  showTitleForm() {
    this.isTitleFormShowed = true;
  }

  submitNewColumnName($event) {
    if (this.columnName.value === '' || this.columnName.value === null) {
      return;
    }
    if ($event !== undefined) {
      if ($event.key !== 'Enter') {
        return;
      }
    }

    this.column.title = this.columnName.value.trim();
    this.columnName.reset();
    this.isTitleFormShowed = false;
  }

  startCardDrag($event: DragEvent, card: Card, id: string) {
    this.cardTransfered = card;
    $event.dataTransfer.setData('text', JSON.stringify({card, id}));
  }

  toggleDrag() {
    this.isDraggedOver = false;
  }

  private addAlreadyExistCard({ card }: Card) {
    if (this.column.cards.find(c => c._id === card._id)) {
      return;
    }

    if (this.column.cards.length >= this.column.stopAt) {
      return;
    }

    card.timestamp = new Date();
    this.column.cards.push(card);
  }

  removeCard() {
    if (this.cardTransfered) {
      this.column.cards = this.column.cards.filter(c => c._id !== this.cardTransfered._id);
    }
  }
}
