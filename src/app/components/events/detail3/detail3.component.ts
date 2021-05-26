import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AEvent} from '../../../models/a-event';
import {AEventsService} from '../../../services/a-events.service';

@Component({
  selector: 'app-detail3',
  templateUrl: './detail3.component.html',
  styleUrls: ['./detail3.component.css']
})
export class Detail3Component implements OnInit {
  @Input() currentEventA: AEvent;
  @Input() editedAEventId: number;
  aEventEdited: boolean;

  constructor(private eventsService: AEventsService) {
    this.aEventEdited = true;
  }

  ngOnInit() {
  }

  saveEditedEvent() {
    this.eventsService.update(this.editedAEventId, this.currentEventA);
    console.log(this.eventsService.aEvents);
  }

  isChanged(): boolean {
    return (this.currentEventA === undefined || this.currentEventA.encode() !==
      this.eventsService.aEvents[this.editedAEventId].encode() && confirm('Are you sure to discard edited changes?') ||
      this.currentEventA.encode() === this.eventsService.aEvents[this.editedAEventId].encode());
  }

  isNotChanged() {
    this.aEventEdited = !(this.currentEventA === undefined || this.currentEventA.encode() !==
      this.eventsService.aEvents[this.editedAEventId].encode());
  }

  clearEditedEvent() {
    if (this.isChanged() === true) {
      this.eventsService.update(this.editedAEventId, new AEvent());
      this.currentEventA = new AEvent();
      console.log(this.eventsService.aEvents);
    }
  }

  resetEditedEvent() {
    if (this.isChanged() === true) {
      this.currentEventA = this.eventsService.get(this.editedAEventId);
      console.log(this.eventsService.aEvents);
    }
  }

  cancelEditedEvent() {
    if (this.isChanged() === true) {
      this.editedAEventId = -1;
      this.eventsService.unSelect.emit(this.editedAEventId);
    }
  }

  removeEditedEvent() {
    if (this.isChanged() === true) {
      this.eventsService.remove(this.editedAEventId);
      this.editedAEventId = -1;
      this.eventsService.unSelect.emit(this.editedAEventId);
    }
  }

}
