
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { User} from '../types/user.type'

import {Observable} from 'rxjs'

let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Content-Type' , 'application/json');
headers = headers.append("Access-Control-Allow-Origin", "*");
headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
headers = headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

console.log(headers)
@Injectable({
    providedIn:"root"
})

export class UserService{   

    constructor(private http:HttpClient){
    
    }

    addUserDetails(userData:User):Observable<User[]>{        
        let serviceUrl="http://localhost:4201/addUser";
        return this.http.post<User[]>(serviceUrl, userData, {headers})
    }

    getAllUser(){
        let serviceUrl="http://localhost:4201/getAllUser";  
        return this.http.get(serviceUrl)
    }
}