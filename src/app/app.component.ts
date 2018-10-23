import { Component } from '@angular/core';
import {FirebaseService} from '../app/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user =  new Array();
  constructor(private fire:FirebaseService,router: Router){
    console.log('users')
    fire.getAuthState().then(data =>{
      if (data == 1){
      fire.getuser().then((data:any) =>{
        router.navigate(['/upload-event']);
      })
      }
      else{
        router.navigate([''])
      }
    })

  }
}
