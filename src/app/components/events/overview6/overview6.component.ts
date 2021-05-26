import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AEvent} from '../../../models/a-event';
import {AEvents2Service} from '../../../services/a-events2.service';

@Component({
  selector: 'app-overview6',
  templateUrl: './overview6.component.html',
  styleUrls: ['./overview6.component.css'],
  providers: [AEvents2Service]
})

export class Overview6Component implements OnInit {
  selectedAEventIndex: number;

  constructor(private eventsService: AEvents2Service,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.fetchEvents();
    console.log(this.eventsService.aEvents.length);

    setTimeout(function(service: AEvents2Service) {
      console.log(service.aEvents.length);
      if (service.aEvents.length == 0) {
        for (let i = 0; i < 5; i++) {
          this.addRandomAEvent();
        }
      }
    }, 500, this.eventsService);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.selectedAEventIndex = params.id;
    });
  }

  fetchEvents() {
    this.eventsService.getAllAEvents();
  }

  onUpdateData() {
    this.eventsService.saveAllAEvents().subscribe(
      (params: Params) => {
      },
      (error) => {
        console.log(error);
      });
  }

  updateSelected(index: number) {
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: index}
    });
  }

  addRandomAEvent() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3));

    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5));

    const newEvent = new AEvent('defqon ' + this.eventsService.aEvents.length, startDate, endDate,
      'best hardstyle event ' + this.eventsService.aEvents.length + ' times back to back',
      Math.floor(Math.random() * 3), Math.random() >= 0.5, Math.floor(Math.random() * 50), Math.floor(Math.random() * 5000));

    this.eventsService.add(newEvent);
  }
}
