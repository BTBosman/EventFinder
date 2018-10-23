import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireStorage} from  'angularfire2/storage'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { promise, Key } from 'protractor';
import { eventNames } from 'cluster';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userRef: AngularFireList<any>;
  events: Observable<any[]>
  event: Observable<any[]>
  profileUrl;
  currentName;
  state;
  constructor( private db: AngularFireDatabase, private storage: AngularFireStorage, private authen: AngularFireAuth) { 
 
  }
 
  getAuthState(){
    //this.authen.auth.signOut();
    return new Promise ((accpt, rej) =>{ 
      this.authen.auth.onAuthStateChanged(user =>{
        if (user){
          this.state = 1;
        }
        else{
          this.state = 0;
        }
        accpt(this.state);
       });
    })
  }

  registerBusiness(email, passw, compName, yourName, img){
    return new Promise ((accpt, rej)=>{
      this.authen.auth.createUserWithEmailAndPassword(email,passw).then(() =>{
        this.authen.authState.subscribe(data =>{
          var dbPath =  'users/' + data.uid ; 
          this.userRef = this.db.list(dbPath);
          this.userRef.push({
            name: yourName,
            compName: compName,
            compimg:img
          })
            accpt('registered')
          })},
          error => 
          {
           rej(error.message)
          })
    })
  }


  login(email,passw){
    return new Promise ((accpt, rej)=>{
     this.authen.auth.signInWithEmailAndPassword(email,passw).then(()=>{
          accpt('worked')
          }, 
          error => 
          {
           rej(error.message)
          })
    })
  }

  logout(){
    console.log('exit')
    this.authen.auth.signOut();
  }
  
  addEventPicture(url){
    return new Promise ((accpt, rej) =>{
      var name = 'name'
      this.storage.ref('pictures/' + name).putString(url,'data_url').then(()=>{
      accpt('worked')
      })
    })
  }
  getuser(){
    return new Promise ((accpt, rej) =>{ 
      this.authen.authState.subscribe(data =>{
        var dbPath = 'users/' + data.uid;  
        console.log(data.uid)
         this.userRef = this.db.list(dbPath);
         this.events = this.userRef.snapshotChanges().pipe(
         map(changes => 
         changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
          accpt (this.events);
        });
     })
  }

  addEvent(name,desc, img, date, startTIme, endTIme, location, fee, busName, enddate, img2){
    this.currentName = busName;
    return new Promise ((accpt, rej)=>{
          var dbPath = 'events/' + this.currentName; 
          this.userRef = this.db.list(dbPath);
          this.userRef.push({
            eventName: name,
            eventDesc: desc,
            date: date,
            startTIme: startTIme,
            endTIme: endTIme,
            going: 0,
            location:location,
            fee: fee,
            img: img,
            hostImg : img2,
            endDate : enddate,
            comments : 0
          })  
       
          accpt('added')      
    })
  }
    addNewNotification(date, Name, img, name){
      console.log(Name)
      var dbPath = 'NewEvents/';
      var userRef = this.db.list(dbPath);
        userRef.push({
          date : date,
          name :  name,
          eventName: Name, 
          img : img
      })
    }
  viewEvent(name){
    this.events =  null;
    return new Promise ((accpt, rej) =>{ 
      this.authen.authState.subscribe(data =>{
        var dbPath = 'events/' + name;  
         this.userRef = this.db.list(dbPath);
         this.events = this.userRef.snapshotChanges().pipe(
         map(changes => 
         changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))));
          accpt (this.events);
        });
     })
  } 

viewSpecificEvent(name,key){
  this.event =  null;
return new Promise ((accpt, rej) =>{
  var dbPath = 'events/' + name + '/' + key;
   this.userRef = this.db.list(dbPath, ref => ref.orderByChild('size').equalTo('large'))
console.log(this.userRef)
// accpt(this.event)
})
}
  
}
