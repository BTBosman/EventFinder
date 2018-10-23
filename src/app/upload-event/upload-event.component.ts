import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-event',
  templateUrl: './upload-event.component.html',
  styleUrls: ['./upload-event.component.css']
})
export class UploadEventComponent implements OnInit {
url;
profileUrl: Observable<string | null>
person : Observable<string | null>;
  constructor(public fire:FirebaseService,private router: Router) { }

  ngOnInit() {
    this.fire.getuser().then((data:any) =>{
      this.person =  data;
    })
  }
  insertImg(event:any){
    if (event.target.files && event.target.files[0]){
      let reader = new FileReader();
  
      reader.onload = (event:any) =>{
       this.url = event.target.result;
  
      }
      reader.readAsDataURL(event.target.files[0]);
  
    }
  }
  upload(eventName,eventDesc,date,startTime,endTime,location,fee, name, enddate, img){
    this.fire.addEventPicture(this.url).then(data =>{
      console.log(data)
      this.fire.addEvent(eventName, eventDesc, this.url, date, startTime, endTime, location, fee, name, enddate, img).then(data =>{
        console.log(data)

        alert("event added");
      })
      this.fire.addNewNotification(date,eventName,this.url, name)
     })
  }
  test(username){
    this.router.navigate(['/view', {name:username}]);
  }
}
