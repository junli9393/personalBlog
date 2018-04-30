import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from './data.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  count = 1;
  constructor(private dataservice: DataService) {}
  title = 'I have the story. Do you have the wine?';
  title2 = '我有故事 ， 你有酒吗 ?';
  text_display = ''
  text_display2 = ''
  typingCallback(that) {
    const total_len = that.title.length;
    const cur_len = that.text_display.length;
    if (cur_len < total_len) {
      that.text_display += that.title[cur_len];
    } else {}
    setTimeout(that.typingCallback, 80, that);
  }

  typingCallback2(that) {
    const total_len = that.title2.length;
    const cur_len = that.text_display2.length;
    if (cur_len < total_len) {
      that.text_display2 += that.title2[cur_len];
    } else {}
    setTimeout(that.typingCallback2, 250, that);
  }


  ngOnInit() {
    this.typingCallback(this);
    this.typingCallback2(this);
  }

  sendMessage(event, title: string): void {
    console.log('sendMessage is called')
    const elementId: string = (event.target as Element).id;
    console.log(event.target.id);
    this.dataservice.sendMessage(event.target.id);
    this.dataservice.sendTitle(title);
  }
  sendMessageByNumber(number: number, title: string) {
    this.dataservice.sendMessage(number);
    this.dataservice.sendTitle(title);
  }
}

