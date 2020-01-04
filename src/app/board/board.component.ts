import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Column, ColumnServiceService} from '../services/column-service.service';
import {Card, CardServiceService} from '../services/card-service.service';
import {FormControl} from '@angular/forms';
import {$v} from 'codelyzer/angular/styles/chars';
import {trigger} from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BoardComponent implements OnInit {

  transfer: Card;

  isShowChangeForm = false;
  isDraggedOver = false;
  isStopAtInputVisible = true;
  columns: Column[] = [];
  stopAtInputValue = new FormControl();
  columnName = new FormControl('');
  cardName = new FormControl('');
  operableCard: Card;
  operableCol;
  isCardTitleFormVisible = false;

  constructor(
    private columnService: ColumnServiceService,
    private cardService: CardServiceService
  ) { }

  cardTransfer(card: Card) {
    console.log(card);
  }

  ngOnInit() {
    this.columnService.createNewColumn();
  }

  dragOver($event: DragEvent) {
    $event.preventDefault();
    this.isDraggedOver = true;
  }

  dropElement($event: DragEvent) {
    $event.preventDefault();
    this.isDraggedOver = false;
    if ($event.dataTransfer.getData('text') === 'New Column') {
      if (this.columns.length === 5) {
        return;
      }
      this.columns.push(this.columnService.createNewColumn());
    }

  }

  handleCardDrop($event: DragEvent, id: string) {
    const col = this.columns.find(col => col._id === id);

    if ($event.dataTransfer.getData('text').includes('Stop') && col.stopAt === undefined) {
      col.stopAt = 5;
      return;
    }


    if ( col.stopAt === undefined || col.stopAt > col.cards.length ) {
      // @ts-ignore
      if (this.operableCard !== undefined && !col.cards.includes(this.operableCard)) {
        const prevCol = this.columns.find(col => col._id === this.operableCol);
        this.operableCard.timestamp = new Date();
        if (this.columns.findIndex(col => prevCol._id === col._id) === this.columns.length - 2) {
          this.operableCard.isCompleted = true;
          // @ts-ignore
          col.cards.unshift(this.operableCard);
        } else {
          this.operableCard.isCompleted = false;
          // @ts-ignore
          col.cards.push(this.operableCard);
        }

        // @ts-ignore
        prevCol.cards = prevCol.cards.filter(card => card._id !== this.operableCard._id);
        this.operableCard = undefined;
        this.operableCol = undefined;
        return;
      } else { // @ts-ignore
        // @ts-ignore
        if (col.cards.includes(this.operableCard)) {
                this.operableCard = undefined;
                this.operableCol = undefined;
                return;
              }
      }


      // @ts-ignore

      this.columns.find(col => col._id === id).cards.push(
        // @ts-ignore
        this.cardService.addNewCard()
      );
    }


  }

  changeStopAt() {
    this.isStopAtInputVisible = false;
  }

  setStop(id: string, $event?) {
    if ($event !== undefined) {
      if ($event.key !== 'Enter') {
        return;
      }
    }
    const col = this.columns.find(col => col._id === id);
    col.stopAt = this.stopAtInputValue.value;
    this.isStopAtInputVisible = true;
    this.stopAtInputValue.reset();
  }

  showChangeForm() {
    this.isShowChangeForm = true;
  }

  setColumnName(id: string, $event?) {
    if (this.columnName.value.trim() === '') {
      return;
    }
    if ($event !== undefined) {
      if ($event.key !== 'Enter') {
        return;
      }
    }

    const col = this.columns.find(col => col._id === id);
    col.title = this.columnName.value;
    this.isShowChangeForm = false;
    this.columnName.reset();
  }

  startCardTransition($event: DragEvent, card: Card) {
    // @ts-ignore
    $event.dataTransfer.setData('text', $event.currentTarget.innerText);
    this.operableCard = card;

  }

  startCardLeaveTransition($event: DragEvent, colId: string, cardId: any) {
    if (this.operableCard._id !== cardId) {
      return;
    }
    this.operableCol = colId;
  }


  showCardForm() {
    this.isCardTitleFormVisible = true;
  }

  setCardName(colId: string, cardId: any, $event: KeyboardEvent) {
    if ($event.key === 'Enter' || $event === undefined) {
      const col = this.columns.find(c => c._id === colId);
      // @ts-ignore
      const card = col.cards.find(c => c._id === cardId);
      if (this.cardName.value !== '') {
        // @ts-ignore
        card.title = this.cardName.value.trim();
        this.isCardTitleFormVisible = false;
        this.cardName.reset();
      }
    }
  }
}
