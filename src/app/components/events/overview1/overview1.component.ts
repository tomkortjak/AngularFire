import {Component, OnInit} from '@angular/core';
import {AEvent} from '../../../models/a-event';

@Component({
  selector: 'app-overview1',
  templateUrl: './overview1.component.html',
  styleUrls: ['./overview1.component.css']
})
export class Overview1Component implements OnInit {
  protected aEvents: AEvent[];

  constructor() {
  }

  ngOnInit() {
    this.aEvents = [];
    for (let i = 0; i < 9; i++) {
      this.addRandomAEvent();
    }
  }

  addRandomAEvent() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3));

    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5));

    this.aEvents.push(new AEvent('defqon ' + this.aEvents.length, startDate, endDate, 'best hardstyle event',
      Math.floor(Math.random() * 3), true, Math.floor(Math.random() * 50), Math.floor(Math.random() * 5000)));
  }

}
