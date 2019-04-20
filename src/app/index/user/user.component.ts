import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';

import { UserService } from '../../services/user.service'

import { User} from '../../types/user.type'
import { $ } from 'protractor';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  userForm: FormGroup;
  firstName: any;
  lastName: any;
  districtList =["Ariyalur", "Chennai", "Coimbatore", "Cuddalore", "Dharampuri", "Dindigul", "Erode", "Kancheepuram", "Kanniyakumarai", "Karur", "Madurai", "Nagapattinam", "Namakkal", "Perambalur", "Pudukottai", "Ramanathapuram", "Salem", "Sivaganga", "Thanjavur", "Niligiris", "Theni", "Thiruvallur", "Thiruvarur", "Tiruchchirapalli", "Tirunelveli", "Tiruvannamalai", "Thoothukudi", "Vellore", "Villupuram", "Virudhnagar"];

  userSearchForm : FormGroup;
  searchQuery:any;


  constructor(private fb:FormBuilder, private userService: UserService ) { 
    console.log(document.getElementById('sx'))
  
    this.userForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      address1: ["", Validators.required],
      address2: ["", Validators.required],
      district: ["", Validators.required],
      state: ["", Validators.required],
     // email: ["", [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )]],
      contactnumber:['',[Validators.required,Validators.minLength(10), Validators.maxLength(15)]]

    })

    this.userSearchForm = this.fb.group({
      searchQuery: ["", Validators.required]
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.userService.addUserDetails(this.userForm.value).subscribe((res:any)=>{
        res.status ? document.getElementById("reset").click() : "";
    })
  }

  get uForm() {
    return this.userForm.controls;
  }

  valChange(fda){
    console.log(fda.value);
  }

}

