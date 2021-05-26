import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AEvent} from '../../../models/a-event';
import {AEvents2Service} from '../../../services/a-events2.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AEvents11Service} from '../../../services/a-events11.service';

@Component({
  selector: 'app-detail11',
  templateUrl: './detail11.component.html',
  styleUrls: ['./detail11.component.css']
})
export class Detail11Component implements OnInit {
  @ViewChild('editForm', {static: false})
  public ngForm: NgForm;
  currentEventA: AEvent;
  editedAEventId: number;
  aEventEdited: boolean;
  defaultSelect: string;

  constructor(private eventsService: AEvents11Service,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.aEventEdited = true;
    this.defaultSelect = 'DRAFT';
  }

  private queryParamsSubscription: Subscription = null;

  ngOnInit() {
    Object.assign(new AEvent(), event);

    // get the event id query parameter form the activated route
    this.queryParamsSubscription =
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        // retrieve the event to be edited from the service
        this.editedAEventId = params.id;
        if (this.getAEventToBeEdited(this.editedAEventId) === undefined) {
          this.router.navigate(['error']);
        } else {
          this.currentEventA = Object.assign(new AEvent(), this.getAEventToBeEdited(params.id));
        }
      });
  }

  onUpdateData() {
    this.eventsService.saveAllAEvents().subscribe(
      (data) => {
      },
      (error) => {
        console.log(error);
      });
  }

  getAEventToBeEdited(id: number): AEvent {
    return this.eventsService.get(id);
  }

  saveEditedEvent() {
    this.eventsService.update(this.editedAEventId, this.currentEventA);
    console.log(this.eventsService.aEvents);
    this.router.navigate(['../../overview11'], {relativeTo: this.activatedRoute});
    this.onUpdateData();
  }

  isChanged(): boolean {
    return (this.currentEventA === undefined || this.currentEventA !==
      this.eventsService.aEvents[this.editedAEventId] && confirm('Are you sure to discard edited changes?') ||
      this.currentEventA === this.eventsService.aEvents[this.editedAEventId]);
  }

  isNotChanged() {
    this.aEventEdited = !(this.currentEventA === undefined || this.currentEventA !==
      this.eventsService.aEvents[this.editedAEventId]);
  }

  clearEditedEvent() {
    if (this.isChanged() === true) {
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
      this.router.navigate(['../../overview11'], {relativeTo: this.activatedRoute});
    }
  }

  removeEditedEvent() {
    if (this.isChanged() === true) {
      this.eventsService.remove(this.editedAEventId);
      this.editedAEventId = -1;
      this.eventsService.unSelect.emit(this.editedAEventId);
      this.router.navigate(['../../overview11'], {relativeTo: this.activatedRoute});
      this.onUpdateData();
    }
  }
}
