import {Component, Input, OnInit} from '@angular/core';
import {SessionServiceService} from '../../../services/session-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-on',
  templateUrl: './sign-on.component.html',
  styleUrls: ['./sign-on.component.css']
})
export class SignOnComponent implements OnInit {
  @Input() formEmail: string;
  @Input() formPassword: string;


  constructor(private session: SessionServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  signOn() {
    this.session.signOn(this.formEmail, this.formPassword);
    if(this.session.checkLoggedIn()){
      this.router.navigate([''], {relativeTo: this.activatedRoute})
    }
  }
  signIn() {
    this.session.signIn(this.formEmail, this.formPassword);
    if(this.session.checkLoggedIn()){
      this.router.navigate([''], {relativeTo: this.activatedRoute})
    }
  }
}
