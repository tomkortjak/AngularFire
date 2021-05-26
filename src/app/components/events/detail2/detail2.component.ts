import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AEvent} from '../../../models/a-event';

@Component({
  selector: 'app-detail2',
  templateUrl: './detail2.component.html',
  styleUrls: ['./detail2.component.css']
})

export class Detail2Component implements OnInit {
  @Input() currentEventA: AEvent;
  @Output() updateEvent = new EventEmitter<AEvent>();
  @Output() removeEvent = new EventEmitter<AEvent>();

  constructor() { }

  ngOnInit() {  }

  saveEditedEvent() {
    this.updateEvent.emit(this.currentEventA);
  }

  removeEditedEvent() {
    this.removeEvent.emit(this.currentEventA);
  }

}
