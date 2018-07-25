import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from '../model/message';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';

//const SERVER_URL = 'http://0.0.0.0:8090';
const SERVER_URL = 'http://webserver-81cecad75b3d8b1b.elb.us-west-2.amazonaws.com:80';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public sendQuit(message: Message): void {
      this.socket.emit('quit', message);
    }

    public sendName(message: Message): void {
      this.socket.emit('name', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
          this.socket.on('message', (data: Message) => {
            console.log(JSON.stringify(data));
            observer.next(data)
          });
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
