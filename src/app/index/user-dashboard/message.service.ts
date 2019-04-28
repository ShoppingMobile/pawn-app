import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class MessageService {
    private subject = new Subject<any>();
    
  //  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isUserLoggedIn():void{
    this.subject.next({ text: "message" });
  }
  getMessage():Observable<any>{
    return this.subject.asObservable();
  }
}