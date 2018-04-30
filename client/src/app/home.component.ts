import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'my world';
  typewriter_text = 'Something to do. Something to look forward to. Someone to love.';
  typewriter_display = '';
  typingCallback(that) {
    const total_length = that.typewriter_text.length;
    const current_length = that.typewriter_display.length;
    if (current_length < total_length) {
      that.typewriter_display += that.typewriter_text[current_length];
    } else {
      // that.typewriter_display = "";
    }
    setTimeout(that.typingCallback, 100, that);
  }

  ngOnInit() {
    this.typingCallback(this);
  }
}
