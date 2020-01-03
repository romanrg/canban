import { Injectable } from '@angular/core';

export const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export interface Column {
  title: string;
  _id: string;
  cards: [];
  timestamp: Date;
  stopAt?: undefined | number;
}

@Injectable({
  providedIn: 'root'
})
export class ColumnServiceService {

  constructor() { }

  createNewColumn(): Column {
    return ({
      title: 'New Column',
      _id: generateId(),
      cards: [],
      timestamp: new Date()
    });
  }
}
