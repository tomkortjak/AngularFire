import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AEvent} from '../../../models/a-event';
import {AEventsService} from '../../../services/a-events.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AbstractControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-detail42',
  templateUrl: './detail42.component.html',
  styleUrls: ['./detail42.component.css']
})

export class Detail42Component implements OnInit, OnDestroy {
  @ViewChild('editForm', {static: false})
  public ngForm: NgForm;
  currentEventA: AEvent;
  editedAEventId: number;
  aEventEdited: boolean;
  defaultSelect: string;

  constructor(private eventsService: AEventsService,
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
        console.log('detail setup id =' + params.id);
        // retrieve the event to be edited from the service
        this.editedAEventId = params.id;
        if (this.getAEventToBeEdited(this.editedAEventId) === undefined) {
          this.router.navigate(['error']);
        } else {
          this.currentEventA = Object.assign(new AEvent(), this.getAEventToBeEdited(params.id));
        }
      });
  }

  ngOnDestroy() {
    // this.queryParamsSubscription &&
    this.queryParamsSubscription.unsubscribe();
  }

  getAEventToBeEdited(id: number): AEvent {
    return this.eventsService.get(id);
  }

  saveEditedEvent() {
    this.eventsService.update(this.editedAEventId, this.currentEventA);
    console.log(this.eventsService.aEvents);
    this.router.navigate(['../../overview42'], {relativeTo: this.activatedRoute});
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
      this.router.navigate(['../../overview4'], {relativeTo: this.activatedRoute});
    }
  }

  removeEditedEvent() {
    if (this.isChanged() === true) {
      this.eventsService.remove(this.editedAEventId);
      this.editedAEventId = -1;
      this.eventsService.unSelect.emit(this.editedAEventId);
      this.router.navigate(['../../overview4'], {relativeTo: this.activatedRoute});
    }
  }
}
