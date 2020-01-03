import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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

  isShowChangeForm = false;
  isDraggedOver = false;
  isStopAtInputVisible = true;
  columns: Column[] = [];
  stopAtInputValue = new FormControl();
  columnName = new FormControl('');
  operableCard: Card;
  operableCol;

  constructor(
    private columnService: ColumnServiceService,
    private cardService: CardServiceService
  ) { }

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
      if (this.operableCard !== undefined && !col.cards.includes(this.operableCard)) {
        const prevCol = this.columns.find(col => col._id === this.operableCol);
        this.operableCard.timestamp = new Date();
        if (this.columns.findIndex(col => prevCol._id === col._id) === this.columns.length - 2) {
          this.operableCard.isCompleted = true;
          col.cards.unshift(this.operableCard);
        } else {
          this.operableCard.isCompleted = false;
          col.cards.push(this.operableCard);
        }

        prevCol.cards = prevCol.cards.filter(card => card._id !== this.operableCard._id);
        this.operableCard = undefined;
        this.operableCol = undefined;
        return;
      } else if (col.cards.includes(this.operableCard)) {
        this.operableCard = undefined;
        this.operableCol = undefined;
        return;
      }


      this.columns.find(col => col._id === id).cards.push(
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
    $event.dataTransfer.setData('text', $event.currentTarget.innerText);
    this.operableCard = card;

  }

  startCardLeaveTransition($event: DragEvent, colId: string, cardId: any) {
    if (this.operableCard._id !== cardId) {
      return;
    }
    this.operableCol = colId;
  }


}
