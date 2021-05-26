import {Component, OnInit} from '@angular/core';
import {AEvent} from '../../../models/a-event';
import {AEventsService} from '../../../services/a-events.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-overview4',
  templateUrl: './overview4.component.html',
  styleUrls: ['./overview4.component.css'],
  providers: [AEventsService]
})
export class Overview4Component implements OnInit{
  selectedAEventIndex: number;

  constructor(private eventsService: AEventsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.selectedAEventIndex = params.id;
    });
  }

  updateSelected(index: number) {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: index}
    });
  }

  // isChanged(): boolean {
  //   return (this.selectedAEvent === undefined || this.selectedAEvent.encode() !==
  //     this.eventsService.aEvents[this.selectedAEventIndex].encode() && confirm('Are you sure to discard edited changes?') ||
  //     this.selectedAEvent.encode() === this.eventsService.aEvents[this.selectedAEventIndex].encode());
  // }
  //
  // ngDoCheck(): void {
  //   this.eventsService.unSelect.subscribe(
  //     (id: number) => (this.selectedAEventIndex = id)
  //   );
  // }

  addRandomAEvent() {
    console.log(this.eventsService.aEvents);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3));

    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5));

    const newEvent = new AEvent('defqon ' + this.eventsService.aEvents.length, startDate, endDate,
      'best hardstyle event ' + this.eventsService.aEvents.length + ' times back to back',
      Math.floor(Math.random() * 3), Math.random() >= 0.5, Math.floor(Math.random() * 50), Math.floor(Math.random() * 5000));

    this.eventsService.add(newEvent);
  }

  // updateSelected(event: AEvent) {
  //   if (this.selectedAEventIndex === -1 || this.isChanged() === true) {
  //     this.selectedAEvent = Object.assign(new AEvent(), event);
  //     this.selectedAEventIndex = this.eventsService.aEvents.indexOf(event);
  //   }
  // }
}
