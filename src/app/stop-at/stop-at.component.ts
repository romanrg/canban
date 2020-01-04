import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-stop-at',
  templateUrl: './stop-at.component.html',
  styleUrls: ['./stop-at.component.scss']
})
export class StopAtComponent implements OnInit {
  @Input() stop: number;
  @Input() length: number;
  @Output() onChanged = new EventEmitter();
  isFormShowed = false;
  stopAt = new FormControl(this.stop);
  constructor() { }

  ngOnInit() {
  }

  change(stopAt: number) {
    if (typeof stopAt === 'number') {
      this.onChanged.emit(stopAt);
      this.isFormShowed = false;
      this.stop = this.stopAt.value;
    }

  }

  showForm() {
    this.isFormShowed = true;
  }


}
