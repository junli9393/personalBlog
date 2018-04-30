import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataService {
  public choice: number;
  public title: string;

  sendMessage(myChoice: number) {
    this.choice = myChoice;
    console.log('sendMessage' + this.choice);
  }

  sendTitle(myTitle: string) {
    this.title = myTitle;
  }
  getMessage(): number {
    console.log('getMessage' + this.choice);
    return this.choice;
  }
  getTitle(): string {
    console.log('getTitle' + this.title);
    return this.title;
  }
}
