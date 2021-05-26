import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetLanguageService {
  private messageSource  = new BehaviorSubject('xx');
  currentMessage  = this.messageSource.asObservable();
  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
    console.log(message);
  }

}
