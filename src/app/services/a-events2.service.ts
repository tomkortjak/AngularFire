import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AEvent} from '../models/a-event';
import * as events from 'events';
import {catchError} from 'rxjs/operators';
import {error} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AEvents2Service {
  readonly url: string;
  public aEvents: AEvent[];
  unSelect = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {
    this.aEvents = [];
    this.url = 'https://web-frameworks-b3264.firebaseio.com/data.json';
  }

  getAllAEvents() {
    this.httpClient.get<AEvent[]>(this.url)
      .subscribe(
        events => {
          // events.forEach(function (event) {
          //
          // });
          this.aEvents = events ? events : [];
        },
        error => console.log(error)
      );
    // .pipe(
    // (response) => console.log(response)
    // );
    // map((rawCountries: any[]) => {
    //     const countries: AEvent[] = [];
    //     for (const rawCountry of rawCountries) {
    //       // transforming raw contries to the custom format
    //       countries.push(evenement);
    //     }
    //     return countries;
    //   }
    // ),catchError(this.handleError));
  }

  saveAllAEvents() {
    return this.httpClient.put<AEvent[]>(this.url, JSON.stringify(this.aEvents));
  }

  get(eIdx: number): AEvent {
    return this.aEvents[eIdx];
  }

  getIndex(event: AEvent): number {
    return this.aEvents.findIndex(x => x === event);
  }

  add(aEvent: AEvent): number {
    this.aEvents.push(aEvent);
    return this.aEvents.indexOf(aEvent);
  }

  update(eIdx: number, aEvent: AEvent) {
    this.aEvents[eIdx] = aEvent;
  }

  remove(eIdx: number): AEvent {
    const removedAEvent = this.aEvents[eIdx];
    this.aEvents.splice(eIdx, 1);
    return removedAEvent;
  }

  addRandomAEvent() {
    console.log(this.aEvents);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3));

    const endDate = new Date();
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5));

    const newEvent = new AEvent('defqon ' + this.aEvents.length, startDate, endDate,
      'best hardstyle event ' + this.aEvents.length + ' times back to back',
      Math.floor(Math.random() * 3), Math.random() >= 0.5,
      Math.floor(Math.random() * (10 * 100 - 1 * 100) + 1 * 100) / (1 * 100), Math.floor(Math.random() * 5000));

    this.aEvents.push(newEvent);
  }

}
