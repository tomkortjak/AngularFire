import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorRoute: string;

  constructor(public route: Router) {
    this.errorRoute = this.route.url;
  }

  ngOnInit() {  }

}
