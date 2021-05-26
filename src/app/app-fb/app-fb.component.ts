import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {SessionServiceService} from '../services/session-service.service';

const firebaseConfig = {
  apiKey: "AIzaSyD3Pmcrxo86tbJ8EL1ipDa3pjo-kqzXdvQ",
  authDomain: "web-frameworks-b3264.firebaseapp.com",
  databaseURL: "https://web-frameworks-b3264.firebaseio.com",
  projectId: "web-frameworks-b3264",
  storageBucket: "web-frameworks-b3264.appspot.com",
  messagingSenderId: "682617183824",
  appId: "1:682617183824:web:5c51183857555b3bd73b55",
  measurementId: "G-MYXR3THV46"
};

firebase.initializeApp(firebaseConfig);

@Component({
selector: 'app-root',
templateUrl: './app-fb.component.html',
styleUrls: ['./app-fb.component.css']
})
export class AppFbComponent implements OnInit {

  constructor(private service: SessionServiceService) { }

  ngOnInit() {
  }

}
