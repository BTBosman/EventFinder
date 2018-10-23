import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public fire:FirebaseService,private router: Router) { }

  ngOnInit() {
  }
  login(email,pass){
        
   if (email != "" && pass != ""){
     this.fire.login(email,pass).then(data =>{
      this.fire.getuser().then((data:any) =>{
        this.router.navigate(['/upload-event'])
      })
     
     },error =>{
        alert(error)
     })
   }
  }
}
