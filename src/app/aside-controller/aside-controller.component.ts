import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside-controller',
  templateUrl: './aside-controller.component.html',
  styleUrls: ['./aside-controller.component.scss']
})
export class AsideControllerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startDrag($event: DragEvent) {
    // ts-ignore
    $event.dataTransfer.setData('text', $event.currentTarget.innerText);
  }
}
