import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/mainpage/header/header.component';
import { HomeComponent } from './components/mainpage/home/home.component';
import { NavBarComponent } from './components/mainpage/nav-bar/nav-bar.component';
import { Overview1Component } from './components/events/overview1/overview1.component';
import {Overview2Component} from './components/events/overview2/overview2.component';
import {Detail2Component} from './components/events/detail2/detail2.component';
import { Overview3Component } from './components/events/overview3/overview3.component';
import { Detail3Component } from './components/events/detail3/detail3.component';
import {Router, RouterModule, Routes} from '@angular/router';
import { ErrorComponent } from './components/mainpage/error/error.component';
import { Detail4Component } from './components/events/detail4/detail4.component';
import { Overview4Component } from './components/events/overview4/overview4.component';
import { Detail42Component } from './components/events/detail42/detail42.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { Overview6Component } from './components/events/overview6/overview6.component';
import { Detail6Component } from './components/events/detail6/detail6.component';
import { AppFbComponent } from './app-fb/app-fb.component';
import { Header2Component } from './components/mainpage/header2/header2.component';
import { SignOnComponent } from './components/mainpage/sign-on/sign-on.component';
import { NavBar2Component } from './components/mainpage/nav-bar2/nav-bar2.component';
import {AuthInterceptor} from './auth-interceptor';
import { Detail11Component } from './components/events/detail11/detail11.component';
import { Overview11Component } from './components/events/overview11/overview11.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'events/overview1', component: Overview1Component },
  { path: 'events/overview2', component: Overview2Component },
  { path: 'events/overview3', component: Overview3Component },
  { path: 'events/overview4', component: Overview4Component, children: [
      { path: 'edit', component: Detail4Component },
    ] },
  { path: 'events/overview42', component: Overview4Component, children: [
      { path: 'edit', component: Detail42Component },
    ] },
  { path: 'events/overview6', component: Overview6Component, children: [
      { path: 'edit', component: Detail6Component },
    ] },
  { path: 'events/overview11', component: Overview11Component, children: [
      { path: 'edit', component: Detail11Component },
    ] },
  { path: 'sign-on', component: SignOnComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavBarComponent,
    Overview1Component,
    Overview2Component,
    Detail2Component,
    Overview3Component,
    Detail3Component,
    ErrorComponent,
    Detail4Component,
    Overview4Component,
    Detail42Component,
    Overview6Component,
    Detail6Component,
    AppFbComponent,
    Header2Component,
    SignOnComponent,
    NavBar2Component,
    Detail11Component,
    Overview11Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppFbComponent]
})
export class AppModule { }
