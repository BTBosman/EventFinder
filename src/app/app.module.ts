import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UploadEventComponent } from './upload-event/upload-event.component';
import { RegisterComponent } from './register/register.component';
import { ViewComponent } from './view/view.component';
import { LogInComponent } from './log-in/log-in.component';
import {AngularFireModule} from  'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule}  from 'angularfire2/auth';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EventComponent } from './event/event.component';


var config = {
  apiKey: "AIzaSyDC_zhhsSv9DZQV6cuJlUf9lHDiSKPo8P8",
  authDomain: "eventsfinder-e75f2.firebaseapp.com",
  databaseURL: "https://eventsfinder-e75f2.firebaseio.com",
  projectId: "eventsfinder-e75f2",
  storageBucket: "eventsfinder-e75f2.appspot.com",
  messagingSenderId: "457482937614"
}

const appRoutes: Routes = [
  { path: 'register', component:RegisterComponent },
  { path: 'upload-event', component: UploadEventComponent },
  { path: 'view', component:ViewComponent },
  { path: '', component:LogInComponent },
  { path: 'event', component:EventComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UploadEventComponent,
    RegisterComponent,
    ViewComponent,
    LogInComponent,
    EventComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(config),

    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
