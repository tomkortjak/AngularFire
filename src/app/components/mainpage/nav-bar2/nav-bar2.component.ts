import { Component, OnInit } from '@angular/core';
import {SessionServiceService} from '../../../services/session-service.service';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.css']
})
export class NavBar2Component implements OnInit {
  isLoggedIn: boolean;

  constructor(private session: SessionServiceService) { }

  ngOnInit() {
    this.isLoggedIn = this.session.checkLoggedIn()
  }

}
