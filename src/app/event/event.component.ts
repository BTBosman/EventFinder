import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {FirebaseService} from '../firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  username;
  key;
  event : Observable<string|null>
  constructor(private route: ActivatedRoute,private router:Router,public fire:FirebaseService) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('name');
    this.key = this.route.snapshot.paramMap.get('key');
    this.getdata();
  }

  getdata(){
    this.fire.viewSpecificEvent(this.username, this.key).then((data:any)=>{
      this.event = data;
      console.log(data)
    })
  }

}
