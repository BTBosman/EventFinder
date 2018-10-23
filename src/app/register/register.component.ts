import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../firebase.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
// import {ToasterServiceService} from '../toaster-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public fire:FirebaseService,private router: Router, ) { }

  ngOnInit() {
  }
  Register(name, compname, email, pass){
    if (email != "" && pass != "" && name != "" && compname != ""){
      this.fire.registerBusiness(email,pass,compname,name,"").then(data=>{
      // this.toasterService.Seccess("Registerd", )
        console.log(data)
        this.router.navigate(['/upload-event'])
        alert("User added");
      }, error =>{
        alert(error)
      })
    }
  }
}
