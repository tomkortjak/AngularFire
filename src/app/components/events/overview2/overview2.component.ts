import {Component, OnInit} from '@angular/core';
import {AEvent} from '../../../models/a-event';

@Component({
  selector: 'app-overview2',
  templateUrl: './overview2.component.html',
  styleUrls: ['./overview2.component.css']
})

export class Overview2Component implements OnInit {
  protected aEvents: AEvent[];
  protected selectedAEvent: AEvent;
  protected selectedIndex: number;

  constructor() {
  }

  public get getSelectedAEvent(): AEvent {
    return this.selectedAEvent;
  }

  ngOnInit() {
    this.aEvents = [];
    for (let i = 0; i < 9; i++) {
      this.addRandomAEvent();
    }
  }

  updateList(event: AEvent) {
    this.aEvents[this.selectedIndex] = this.selectedAEvent;
  }

  addRandomAEvent() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3));

    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5));

    const newEvent = new AEvent('defqon ' + this.aEvents.length, startDate, endDate,
      'best hardstyle event ' + this.aEvents.length + ' times back to back',
      Math.floor(Math.random() * 3), Math.random() >= 0.5, Math.floor(Math.random() * 50), Math.floor(Math.random() * 5000));

    this.aEvents.push(newEvent);
  }

  updateSelected(event: AEvent) {
    this.selectedAEvent = Object.assign({}, event);
    this.selectedIndex = this.aEvents.indexOf(event);
  }

  removeSelected(event: AEvent) {
    const index = this.aEvents.indexOf(event);
    if (index !== -1) {
      this.aEvents.splice(index, 1);
    } else {
      return;
    }

    this.selectedAEvent = null;
  }

}
