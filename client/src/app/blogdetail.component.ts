import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { DataService } from './data.service';
import {Subscription} from 'rxjs/Subscription';
import {Data} from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-blog-detail',
  styleUrls: ['./blogdetail.component.css'],
  templateUrl: './blogdetail.component.html'
})
export class BlogdetailComponent implements OnInit {
  yourBoolean = true;
  count = 0;
  title = 'Something to do. Something to look forward to. Someone to love.';

  constructor(private dataService: DataService) {
  }

  typewriter_display = '';
  typingCallback(that) {
    const total_length = that.title.length;
    const current_length = that.typewriter_display.length;
    if (current_length < total_length) {
      that.typewriter_display += that.title[current_length];
    } else {
      // that.typewriter_display = "";
    }
    setTimeout(that.typingCallback, 50, that);
  }

  ngOnInit() {
    this.count = this.dataService.getMessage();
    this.title = this.dataService.getTitle();
    // this.typingCallback(this);
  }
}
