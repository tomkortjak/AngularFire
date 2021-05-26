import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  dag() {
    return new Date().toLocaleString('en-EN', {weekday: 'long'}).replace(',', '');
  }

  datum() {
    return new Date().toLocaleString('en-EN', {year: 'numeric', month: 'long', day: 'numeric'}).replace(',', '');
  }

}
