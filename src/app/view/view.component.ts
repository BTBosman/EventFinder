import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FirebaseService} from '../firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
username;
events : Observable<string|null>
  constructor(private router: Router,  private route: ActivatedRoute,public fire:FirebaseService) { 

  }

  ngOnInit() {
   this.username = this.route.snapshot.paramMap.get('name');
   this.fire.viewEvent(this.username).then((data:any) =>{
    this.events =  data;
   })
  }
  Event(x){
    this.router.navigate(['/events', {name:this.username, key:x}]);
  }

}
