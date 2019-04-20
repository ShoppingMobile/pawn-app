import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';

import { UserService } from '../services/user.service'

import { User} from '../types/user.type'
import { $ } from 'protractor';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class IndexComponent implements OnInit {
  userForm: FormGroup;
  firstName: any;
  lastName: any;

  userSearchForm : FormGroup;
  searchQuery:any;


  constructor(private fb:FormBuilder, private userService: UserService ) { 
    console.log(document.getElementById('sx'))
  
    this.userForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )]],
      contactnumber:['',[Validators.required,Validators.minLength(10), Validators.maxLength(15)]]

    })

    this.userSearchForm = this.fb.group({
      searchQuery: ["", Validators.required]
    })
    //this.firstName=this.userForm.get('firstName').value;
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.userForm.value);
    
    

    this.userService.addUserDetails(this.userForm.value).subscribe((res:any)=>{
        res.status ? document.getElementById("reset").click() : "";
    })
  }

  get uForm() {
    return this.userForm.controls;
  }
  get uSForm() {
    return this.userSearchForm.controls;
  }

  valChange(fda){
    console.log(fda.value);
  }


}
