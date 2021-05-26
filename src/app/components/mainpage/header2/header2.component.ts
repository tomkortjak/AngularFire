import {Component, OnInit} from '@angular/core';
import {SessionServiceService} from '../../../services/session-service.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  constructor(private session: SessionServiceService) {
  }

  ngOnInit() {
  }

  dag() {
    return new Date().toLocaleString('en-EN', {weekday: 'long'}).replace(',', '');
  }

  datum() {
    return new Date().toLocaleString('en-EN', {year: 'numeric', month: 'long', day: 'numeric'}).replace(',', '');
  }
  gebruiker() :string {
    console.log(this.session.token);

    return (this.session.token != null ? "User" : "Visitor");

  }

}
