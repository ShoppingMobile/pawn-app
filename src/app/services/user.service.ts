
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { User} from '../types/user.type'
import { Particular} from '../types/particular.type';

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
    getUser(id:any){
        let serviceUrl="http://localhost:4201/getUser";  
        return this.http.post<User[]>(serviceUrl, {id:id}, {headers})
    }

    editUser(...data:any){
        let serviceUrl="http://localhost:4201/editUser";  
        return this.http.put(serviceUrl, {data:data[0], userId:data[1]}, {headers})
    }

    addParticularDetails(particularData:Particular):Observable<Particular[]>{        
        let serviceUrl="http://localhost:4201/addParticular";
        return this.http.post<Particular[]>(serviceUrl, particularData, {headers})
    }

    editParticular(particularData:Particular, particularId:number, userId:number):Observable<Particular[]>{ 
        let serviceUrl="http://localhost:4201/editParticular";
        return this.http.put<Particular[]>(serviceUrl, {data:particularData, particularId:particularId, userId: userId}, {headers})
    }

    getAllParticularUser(id:any){
        let serviceUrl="http://localhost:4201/getAllParticularUser";  
        return this.http.post<User[]>(serviceUrl, {id:id}, {headers})
    }
    getAllParticularAllUser(){
        let serviceUrl="http://localhost:4201/getAllParticularAllUser";  
        return this.http.get<User[]>(serviceUrl)
    }
    getSingleParticular(particularId){
        let serviceUrl="http://localhost:4201/getSingleParticular";  
        return this.http.post(serviceUrl,{particularId:particularId},  {headers});
    }

    searchUserId(){
        let serviceUrl="http://localhost:4201/searchUserId";  
        return this.http.get<User[]>(serviceUrl)
    }






}