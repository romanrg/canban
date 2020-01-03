import { Injectable } from '@angular/core';
import {Column, generateId} from './column-service.service';

export interface Card {
  title: string;
  _id: string;
  timestamp: Date;
  workers: [];
  isCompleted: boolean;
  color: string;
}

function getRandomBackground() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor() { }

  addNewCard(): Card {
    return ({
      title: 'New Card',
      _id: generateId(),
      timestamp: new Date(),
      workers: [],
      isCompleted: false,
      color: getRandomBackground()
    });
  }
}
